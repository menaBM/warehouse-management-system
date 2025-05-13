import Item from "./Item";
import { Order } from "./Order";

export class Inventory {
    items = new Map<string, Item>;
  
    constructor () {
      //load from json?
      const testItems = [
        {item: "item 1", value: new Item("item 1", 5, 34)},
        {item: "item 2", value: new Item("item 2", 5, 100)},
        {item: "item 3", value: new Item("item 3", 5, 48)},
        {item: "item 4", value: new Item("item 4", 5, 23)}
      ]
  
      testItems.forEach(item => {
        this.items.set(item.item, item.value)
      })
  
    }
  
    generateReport () {
    }
  
    updateStock (item: Item, quantity: number) { 
      //need to check change is valid
  
    }
  
    lookupItem (name: string): Item | undefined {
      return this.items.get(name)
    }
  
    checkInStock (item: Item, quantity: number) { // validate quantity not negative
      const stock = this.items.get(item.getName())
      // move to lookUpItem method
      if ( stock ) { 
        return stock ? stock.quantity >= quantity : false;
      }
      return false;
    }
  
    checkLowStock (item: Item) {
      // defined as a percentage or stored in a field on the item?
    }
  
    processOrder (order: Order) {
      // could be customerOrder or supplierOrder
  
      //loop through order.getItems() 
  
      //updateStock()
    }
  }