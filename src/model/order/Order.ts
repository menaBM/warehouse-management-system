import { Inventory } from "../Inventory";
import Item from "../Item";

export class Order {
    private total: number = 0;
    // date: Date;
    // deliveryLocation: string;
    private items: Map<Item, number>;
  
    constructor() {
      this.total = 0;
      this.items = new Map<Item, number>;
    }
  
    getAllItems (): Map<Item, number> {
      return this.items
    }
  
    // getItem (item: Item) {
    //   return this.items.get(item)
    // }

    addItem (item: Item, quantity: number){
      this.items.set(item, quantity)
      this.total += item.getPrice() * quantity;
    }
  
    hasItem (item: Item) {
      return this.items.has(item)
    }
  
    removeItem (item: Item) {
      this.items.delete(item)
    }

    getTotal(): number {
      return this.total;
    }

    getSummary() {
      let order: Array<Array<string>> = [["Name", "Quantity", "Price"]]
      this.items.forEach((quantity, item) => {
        const price: number = item.getPrice() * quantity;
        order.push([item.getName(), quantity.toString(), price.toString()])
      })
      return order;
    }

    complete (inventory: Inventory) {
    }
} 