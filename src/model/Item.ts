export default class Item {
    private name: string;
    private price: number;
    private supplierPrice: number;
    private quantity: number;
    private lowStockThreshold: number;
    private supplierName: string;
  
    constructor (name: string, price: number, supplierPrice: number, quantity: number, lowStockThreshold: number, supplierName: string) {
      this.name = name
      this.price = price
      this.supplierPrice = supplierPrice
      this.quantity = quantity
      this.lowStockThreshold = lowStockThreshold
      this.supplierName = supplierName;
    }
  
    // setName (name : string) {
    //   this.name = name;
    // }
  
    getName () : string {
      return this.name
    }
  
    // setPrice (price: number) {
    //   this.price = price
    // }
  
    getPrice (): number {
      return this.price
    }

    getSupplierPrice (): number {
      return this.supplierPrice
    }
  
    setQuantity (quantity: number) {
      this.quantity = quantity
    }
  
    getQuantity (): number {
      return this.quantity
    }

    setSupplierName(supplierName: string) {
      this.supplierName = supplierName
    }

    getSupplierName(): string {
      return this.supplierName
    }

    isLowStock (): Boolean {
      return this.quantity <= this.lowStockThreshold
    }
}