
import Item from "./entities/Item";

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Inventory {
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


class Order {
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

class PlaceOrder {
  order: Order = new Order();  

  add (name: string, quantity: number) {
    //first check inventory - get the item object and check the quantity eg.
    //const item = Inventory.getItem(item)
    //Inventory.checkQuantity(item, quantity)
    //total += item.getPrice()

    this.order.setItem(name, quantity)
    return {message: `${name} added`, success: true} // make a type?
  }


  edit (name: string, quantity: number) {
    const orderQuantity = this.order.getItem(name)

    if ( orderQuantity === undefined  ) {
      return {message: `${name} not found`, success: false}
    }

    if (quantity > orderQuantity) {
      console.log("checking quantity")
       //Inventory.checkQuantity(item, quantity)
       // if not in stock return error message
    }

     //Inventory.getItem(item)
    
    //  item  =  new Item ()
    // update total
    this.order.setItem(name, quantity)
  }

  viewOrder () {
    // should return order data
    console.log(this.order.getAllItems())
  }
}

class Item {
  name: String = "test";
  price: number = 50;

  setname (name : string){
    this.name = name;
  }
}

let test = new PlaceOrder()
console.log(test.add("name", 2))
test.viewOrder()
console.log(test.edit("name", 5))
test.viewOrder()
console.log(test.edit("test", 5))
test.viewOrder()
