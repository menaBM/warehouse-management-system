export default class Item {
    private name: string;
    private price: number;
    private quantity: number;
    private lowStockThreshold: number;
  
    constructor (name: string, price: number, quantity: number, lowStockThreshold?: number) {
      this.name = name
      this.price = price
      this.quantity = quantity
      this.lowStockThreshold = lowStockThreshold ?? Math.round(quantity * 0.2);
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

    // setLowStockThreshold () 

    isLowStock (): Boolean {
      return this.quantity <= this.lowStockThreshold
    }
}