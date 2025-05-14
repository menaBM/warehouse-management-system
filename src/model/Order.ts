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
      //update total price
    }
  
    removeItem (item: Item) {
      this.items.delete(item)
    }
} 