import Item from "./Item";
import { Order } from "./Order";

export class Inventory {
    items = new Map<string, Item>;
  
    constructor () {
      //load from json?
      const testItems = [
        {item: "item 1", value: new Item("item 1", 5, 34, 50)},
        {item: "item 2", value: new Item("item 2", 5, 100)},
        {item: "item 3", value: new Item("item 3", 5, 48, 50)},
        {item: "item 4", value: new Item("item 4", 5, 23)}
      ]
  
      testItems.forEach(item => {
        this.items.set(item.item, item.value)
      })
  
    }
  
    generateReport () {
      let report: Array<Array<string>> = [["Item", "Quantity", "Low Stock"]]
      this.items.forEach(item => {
        const isLowStock: string = item.isLowStock() ? "Yes" : "No";
        report.push([item.getName(), item.getQuantity().toString(), isLowStock])
      })
      return report;
    }

    getLowStock () {
      let lowStock: Array<Array<string>> = [["Item", "Quantity"]]
      let items = [...this.items.values()].filter(item => item.isLowStock())
      items.map(item => lowStock.push([item.getName(), item.getQuantity().toString()]))
      return lowStock
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
  
    processOrder (order: Order) {
      // could be customerOrder or supplierOrder
  
      //loop through order.getItems() 
  
      //updateStock()
    }
  }