import { Inventory } from "../model/Inventory";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class InventoryController extends BaseController {
  private inventory: Inventory;
  
  constructor (menu: Menu, inventory: Inventory) {
    super(menu)
    this.inventory = inventory;
    this.actions = new Map([
      ['Stock Report', this.stockReportAction],
      ['Low Stock Items', this.lowStockAction],
      ['Check Item Stock', this.checkStockAction],
      ['Add new Inventory', this.addInventoryAction]
    ])
  }

  stockReportAction = () => { 
    this.menu.drawTable(this.inventory.generateReport())
  }

  lowStockAction = () => {
    // handle if no low stock
    this.menu.drawTable(this.inventory.getLowStock())
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

  checkStockAction = async () => {
    const item = await this.getItemInput()
    this.menu.outputMessage(`${item.getName()}: ${item.getQuantity()}`)
  }

  addInventoryAction = async () => {
    //verify inputs, check name not already used
    const name: string = await this.menu.getInput("Enter item name:")
    const price: number = parseInt( await this.menu.getInput("Enter item price:"))
    const quantity: number = parseInt(await this.menu.getInput("Enter quantity of item currently in stock:")) 
    const lowStockThreshold: number = parseInt( await this.menu.getInput("Enter threshold for item to be considered low stock:")) 

    this.inventory.addItem(name, price, quantity, lowStockThreshold)
  }
}