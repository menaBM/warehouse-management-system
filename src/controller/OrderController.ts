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
  
    const actions: Map< string, {(): any}>= new Map([['Add Item', this.addAction] , ['Edit Quantity', this.editAction], ['Remove Item', this.removeAction], ['View Order', this.viewAction]])
   
    
    const choice = await this.menu.selectOption("Please select an option:", [...actions.keys()]) 


    let index = parseInt(choice) - 1;

    // if ( !Number.isNaN(index) ) // && index in range
    // loop until valid choice, output error message

    console.log("rootaction", [...actions.values()][index])
  }

  addAction () {

  }

  editAction () {

  }

  removeAction () {

  }

  viewAction () {}
}