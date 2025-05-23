import Item from "./Item";

export class Inventory {
  private items = new Map<string, Item>;

  constructor () {
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

  addItem (name:string, price:number, quantity:number, lowStockThreshold: number) {
    const item = new Item(name, price, quantity, lowStockThreshold)
    this.items.set(name, item)
  }

  lookupItem (name: string): Item | undefined {
    return this.items.get(name)
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

  updateStock (items: Map<Item, number>) {
    //need to check change is valid

    let alerts = new Array<Array<string>>
    items.forEach((quantity, item) => {
      const stock = this.items.get(item.getName())
      
      if (!stock) return
      
      // check sufficient stock
      stock.setQuantity(stock.getQuantity() - quantity)
    
      if (stock.isLowStock()) {
        alerts.push([`${stock.getName()}" currentyl at ... units, threshold is ...`])
      }
      this.items.set(stock.getName(), stock)
    })  
    return alerts
  }

  // updateItemStock (item: Item, quantity: number) { 
  //   //need to check change is valid

  // }

  // checkInStock (item: Item, quantity: number) { // validate quantity not negative
  //   const stock = this.items.get(item.getName())
  //   if ( stock ) {
  //     return stock ? stock.getQuantity() >= quantity : false;
  //   }
  //   return false;
  // }
}