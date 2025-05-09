export default class Item {
    name: string;
    price: number;
    quantity: number;
  
    constructor (name: string, price: number, quantity: number) {
      this.name = name
      this.price = price
      this.quantity = quantity
    }
  
    setName (name : string) {
      this.name = name;
    }
  
    getName () : string {
      return this.name
    }
  
    setPrice (price: number) {
      this.price = price
    }
  
    getPrice (): number {
      return this.price
    }
  
    setQuantity (quantity: number) {
      this.quantity = quantity
    }
  
    getQuantity (): number {
      return this.quantity
    }
}