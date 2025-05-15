import { Inventory } from "../model/Inventory";
import { Order } from "../model/Order";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class OrderController extends BaseController {  
  order: Order = new Order(); 
  inventory: Inventory;
  
  constructor (inventory: Inventory, menu: Menu) {
    super(menu)
    this.inventory = inventory;
    this.actions = new Map([['Add Item', this.addAction] , ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction]])
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

  async getItemInOrder () {
    while (true) {
      const item = await this.getItemInput()
      if (this.order.hasItem(item)) {
        return item
      }
      this.menu.outputMessage(`${item.getName()} not found in order`)
    }
  }

  addAction =  async () => { // needs to be arrow function to keep context of 'this'
    const item = await this.getItemInput()
    const quantity = await this.getQuantityInput()

    if (!item.getQuantity() || item.getQuantity() < quantity) {
        //handle properly - as part of inventory
        console.log("insufficient stock")
        return
    }

    // should error if already in the order - or update quantity?

    this.order.setItem(item, quantity)
  }

    editAction = async () => {
        const item = await this.getItemInOrder()
        const quantity = await this.getQuantityInput()

        //quantity check

        this.order.setItem(item, quantity)
  }

  removeAction = async () => {
    const item = await this.getItemInOrder()
    this.order.removeItem(item)
  }

  viewAction = () => {
    console.log(this.order.getAllItems())
  }

  // Action for viewing in stock items
}