"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("./entities/Item"));
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//compile npx tsc
//init git repo
// push git repo?
/*

UI
menu class?
has options lists depedning on which menu? adn the options know what they need to call? options class
- would end up with lots of lists?!
- look at the cmd line game lesson - how should be strucutred
- has input and output methods that are used?


Business logic

- supplier class
-> contact details
-> order history
need to add updat and delete suppliers, class of supplier phone book - handles looking up the suplpier entities and changes?
-(these are the orders we put in for new stock)



create new orders, order tracking and delivery management - ?? n order class, created by another class and order is connected to supplier

best practiceds - should have a frontedn and backend folder? or both in src?


assumptions - what does low stopck levels mean - have I assumed it is < 20 or <10%, or am I letting the user input what they consider low

*/
//good practice to have the interfaces and stuff?! and need polymorrphosm and nonsense - what classses here will be related?
// https://medium.com/data-bistrot/composition-vs-inheritance-in-python-oop-d4b3c3d8b463
// https://www.geeksforgeeks.org/association-composition-aggregation-java/
// https://dev.to/yugjadvani/how-to-write-better-typescript-code-best-practices-for-clean-effective-and-scalable-code-38d2
//interface - select item - in stock - try again / add item to order - if multiple of the same thing added collect - print current order each time - allow remove  / add / cancel / finish - when finish process the order and do the removals from stock ? - payment ? - delivery location? / process payment - add to fininacila reporting
//shoud checkout be another type of menu? - basic menu, orderMenu, checkoutMenu, 
class Menu {
    constructor() {
        this.options = ['add item', 'checkout', 'edit items', 'cancel']; //enum?  // array is an ordered list so works for the mumbering system 
    }
    //options should be held in the processOrder class, frontend gets the options and outputs them - don't need multiple classes, what about submenus ? 
    // -> the process order class calls the frontend wihtt he options it wants shown and the frontend shows and gets inputs . can just recall with the next quesion
    // dont want to have piles of options in the code - can have a tree structure for the actions, once an action is complete can go to the beginning until cancelled?
    //  could store in json: 
    // options: {
    //  add: [{"please select an item ": string}, {"please enter quantity": int}], // when get to the end of a flow - call the cmd and then returns true or false - knows to do the error or success msg?
    //  delete: {"are you sure [y/n]": "y / n"},
    // }
    // pass to the menu - not from prcess order though!! in main menu need to map the processOrder class to the input sentences for this menu?
    //constructor for the options
    menu() {
        // while true
        this.printOptions();
        this.selectOption();
        //select option 
    }
    printOptions() {
        for (const [index, option] of this.options) {
            console.log(`${index + 1}. ${option}`);
        }
    }
    selectOption() {
        rl.question("Please enter the number of your selection", (input) => {
            // change to enter command assocaiated with enum ?
            rl.close();
        });
    }
}
class Order {
    //make these private
    constructor() {
        this.total = 0;
        this.total = 0;
        this.items = new Map;
        // this.items.set(item, 1)
    }
    getAllItems() {
        console.log(this.items);
    }
    getItem(item) {
        return this.items.get(item);
    }
    hasItem(item) {
        return this.items.has(item);
    }
    setItem(item, quantity) {
        this.items.set(item, quantity);
        //update total price
    }
    removeItem(item) {
        this.items.delete(item);
    }
}
//make all class fields provate? and functions 
class PlaceOrder {
    constructor() {
        this.order = new Order();
    }
    // enum commands {add = add} // in the menu have this, have it loaded from hte json probably, have a recursive function to handle submeneus? but how to pas the info nicecly? 
    // --> just have the menu have the functions and handle the inputs, then call the right one of these with the data gathered duh - load them from hte json into the menu class or seomthing (menu should do checks for valid input )
    // have room for the menu to output the success or error message response . use true / false to determine whether should move onto the next question / home or redo quetsion . always need cancel for hte little actions too - what about error messages? send back error and sucess messages for menu to use as well as true /false?
    add(name, quantity) {
        //first check inventory - get the item object and check the quantity eg.
        //Inventory.getItem(item)
        //Inventory.checkQuantity(item, quantity)
        const item = new Item();
        //total += item.getPrice()
        this.order.setItem(name, quantity);
        return { message: `${name} added`, success: true }; // make a type?
    }
    edit(name, quantity) {
        const orderQuantity = this.order.getItem(name);
        if (orderQuantity === undefined) {
            return { message: `${name} not found`, success: false };
        }
        if (quantity > orderQuantity) {
            console.log("checking quantity");
            //Inventory.checkQuantity(item, quantity)
            // if not in stock return error message
        }
        //Inventory.getItem(item)
        //  item  =  new Item ()
        // update total
        this.order.setItem(name, quantity);
    }
    // checkInventory(name: string, quantity: number) {
    //   //first check inventory - get the item object and check the quantity eg.
    //   //Inventory.getItem(item)
    //   //Inventory.checkQuantity(item, quantity)
    //   // throw error for item not found or insufficient stock
    //   return new Item()
    // }
    viewOrder() {
        // should return order data
        console.log(this.order.getAllItems());
    }
}
// try {
//   item = this.checkInventory(name, quantity)
// } catch (error) {
//   return {message: error, success: false}
// }
class Item {
    constructor() {
        this.name = "test";
        this.price = 50;
    }
    setname(name) {
        this.name = name;
    }
}
let item = new Item();
let item2 = new Item();
let item3 = new Item();
item3.name = "test 2";
let test = new PlaceOrder();
console.log(test.add("name", 2));
test.viewOrder();
console.log(test.edit("name", 5));
test.viewOrder();
console.log(test.edit("test", 5));
test.viewOrder();
