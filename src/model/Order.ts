export class Order {
    total: number = 0;
    // date: Date;
    // deliveryLocation: string;
    items: Map<string, number>; //define type?
    //make these private
  
    constructor() {
      this.total = 0;
      this.items = new Map<string, number>;
    }
  
    getAllItems () {
      console.log(this.items)
    }
  
    getItem (item: string) {
      return this.items.get(item)
    }
  
    hasItem (item: string) {
      return this.items.has(item)
    }
  
    setItem (item: string, quantity: number){
      this.items.set(item, quantity)
      //update total price
    }
  
    removeItem (item: string) {
      this.items.delete(item)
    }
} 