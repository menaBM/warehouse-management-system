import { FinancialReport } from "../model/FinancialReport";
import { Inventory } from "../model/Inventory";
import Item from "../model/Item";
import { Order } from "../model/order/Order";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class OrderController extends BaseController {
  private order: Order;
  private orderClass: typeof Order
  private inventory: Inventory;
  private financialReport: FinancialReport;

  constructor (inventory: Inventory, menu: Menu, order: typeof Order, financialReport: FinancialReport) { 
    super(menu)
    this.inventory = inventory;
    this.orderClass = order
    this.order = new order()
    this.financialReport = financialReport
    this.actions = new Map([['Add Item', this.addAction] , ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction], ["Complete Order", this.completeAction]])
  }

  async rootAction (): Promise<void> {
    this.order = new this.orderClass()
    await super.rootAction()
  }

  async getItemInput () {
    while (true) {
      const itemName =  await this.menu.getInput("Enter item name:")
      const item = this.inventory.lookupItem(itemName)
      if (item) {
        return item
      }
      this.menu.outputMessage(`${itemName} not found in inventory`)
    }
  }
    
  async getQuantityInput (item: Item) {
    while (true) {
      const quantity =  Number( await this.menu.getInput("Enter item quantity:") )
      if (quantity) {
        if (!this.order.isValidQuantity(item, quantity)) {
          this.menu.outputMessage("Insufficient stock")
          continue
        }
        return quantity
      }
      this.menu.outputMessage(`Invalid quantity`)
    }
  }

  private async getItemInOrder () {
    while (true) {
      const item = await this.getItemInput()
      if (this.order.hasItem(item)) {
        return item
      }
      this.menu.outputMessage(`${item.getName()} not found in order`)
    }
  }

  private addAction =  async () => {
    const item = await this.getItemInput()

    if (this.order.hasItem(item)) {
      this.menu.outputMessage(`${item.getName()} already part of order`)
      return
    }

    const quantity = await this.getQuantityInput(item)

    this.order.setItem(item, quantity)
  }

  private editAction = async () => {
    const item = await this.getItemInOrder()
    const quantity = await this.getQuantityInput(item)
    this.order.setItem(item, quantity)
  }

  private removeAction = async () => {
    const item = await this.getItemInOrder()
    this.order.removeItem(item)
  }

  private viewAction = () => {
    this.menu.drawTable(this.order.getSummary())
    this.menu.outputMessage(`Order Total: ${this.order.getTotal()}`)
  }

  private completeAction = () => {
    this.menu.outputMessage("Your final order is as follows:")
    this.viewAction()

    const output: Array<string> = this.order.complete(this.inventory, this.financialReport)
  
    output.forEach((message) => {
      this.menu.outputMessage(message)
    })

    this.exitAction()
  }
}