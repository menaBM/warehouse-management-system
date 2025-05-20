import { Inventory } from "../model/Inventory";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class InventoryController extends BaseController {
  inventory: Inventory = new Inventory();
  
  constructor (menu: Menu) {
    super(menu)
    this.actions = new Map([['Stock Report', this.stockReportAction], ['Low Stock Items', this.lowStockAction], ['Check Item Stock', this.checkStockAction]])
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
}