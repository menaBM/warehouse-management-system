import Item from "./Item";

export class Order {
    total: number = 0;
    // date: Date;
    // deliveryLocation: string;
    items: Map<Item, number>; //define type?
    //make these private
  
    constructor() {
      this.total = 0;
      this.items = new Map<Item, number>;
    }
  
    getAllItems () {
      console.log(this.items)
    }
  
    getItem (item: Item) {
      return this.items.get(item)
    }
  
    hasItem (item: Item) {
      return this.items.has(item)
    }
  
    setItem (item: Item, quantity: number){
      this.items.set(item, quantity)
      this.total += item.getPrice() * quantity;
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
} 