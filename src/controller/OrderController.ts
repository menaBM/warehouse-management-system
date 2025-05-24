import { Inventory } from "../model/Inventory";
import { Order } from "../model/order/Order";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class OrderController extends BaseController {
  private order: Order;
  private orderClass: typeof Order
  private inventory: Inventory;

  constructor (inventory: Inventory, menu: Menu, order: typeof Order) { 
    super(menu)
    this.orderClass = order
    this.order = new order()
    this.inventory = inventory;
    this.actions = new Map([['Add Item', this.addAction] , ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction], ["Complete Order", this.completeAction]])
  }

  async rootAction (): Promise<void>  { 
    this.order = new this.orderClass
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
    
  async getQuantityInput () {
    while (true) {
      const quantity =  Number( await this.menu.getInput("Enter item quantity:") )
      if (quantity) {
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
    const quantity = await this.getQuantityInput()

    // if (!item.getQuantity() || item.getQuantity() < quantity) {
    //     //handle properly
    //     console.log("insufficient stock")
    //     return
    // }

    // should error if already in the order - or update quantity?

    this.order.addItem(item, quantity)
  }

  private editAction = async () => {
    const item = await this.getItemInOrder()
    const quantity = await this.getQuantityInput()

    //quantity check

    this.order.addItem(item, quantity)
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

    //confirm yes / no
    //delivery address
    const output = this.order.complete(this.inventory)
    // this.menu.drawTable(output) - stock alerts

    this.exitAction()
  }
  // Action for viewing in stock items
}