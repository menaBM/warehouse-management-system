import { Menu } from "../view/menu";
import { Inventory } from "../model/Inventory";
import { Order } from "../model/Order";

export class OrderController { 
  order: Order = new Order(); 
  inventory: Inventory;
  menu: Menu;
  
  constructor (inventory: Inventory, menu: Menu) {
    this.inventory = inventory;
    this.menu = menu;
  }

    async rootAction () { // in parent class and set options in contructor
        while (true) {
            const actions: Map< string, {(): any}>= new Map([['Add Item', this.addAction] , ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction]])
            const choice = await this.menu.selectOption("Please select an option:", [...actions.keys()]) 

            let index = parseInt(choice) - 1;

            // if ( !Number.isNaN(index) ) // && index in range
            // loop until valid choice, output error message

            await [...actions.values()][index]()
        }
    }

  async getItemInput () {
    const itemName =  await this.menu.getInput("Enter item name:") 

    //validate is string

    const item = this.inventory.lookupItem(itemName)

    // error message if not found

    return item
  }

  async getQuantityInput () {
    const quantity = await this.menu.getInput("Enter item quantity:") 

    //validate int

    return parseInt(quantity)
  }

    addAction =  async () => { // needs to be arrow function to keep context of 'this'
    const item = await this.getItemInput()
    const quantity = await this.getQuantityInput()

    if (!item?.getQuantity() || item?.getQuantity() < quantity) {
        //handle properly
        console.log("insufficient stock")
        return
    }

    // should error if already in the order - or update quantity?

    this.order.setItem(item, quantity)
  }

    editAction = async () => {
        const item = await this.getItemInput()
        const quantity = await this.getQuantityInput()

        if (!item) {return } // remove once validated

        if (!this.order.hasItem(item)) {
            // error message
          // try again 
        }

        this.order.setItem(item, quantity)
  }

  removeAction = async () => { // similar to edit action? 
    const item = await this.getItemInput()

    if (!item) {return } // remove once validated
    
    if (!this.order.hasItem(item)) {
      // error message
      // loop back to try again
      return
    } 

    this.order.removeItem(item)
  }

  viewAction = () => {
    console.log(this.order.getAllItems())
  }

  // Action for viewing in stock items
}