export class Item {
  private name: string;
  private price: number;
  private supplierPrice: number;
  private quantity: number;
  private lowStockThreshold: number;
  private supplierName: string;

  constructor(
    name: string,
    price: number,
    supplierPrice: number,
    quantity: number,
    lowStockThreshold: number,
    supplierName: string,
  ) {
    this.name = name;
    this.price = price;
    this.supplierPrice = supplierPrice;
    this.quantity = quantity;
    this.lowStockThreshold = lowStockThreshold;
    this.supplierName = supplierName;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getSupplierPrice(): number {
    return this.supplierPrice;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setSupplierName(supplierName: string): void {
    this.supplierName = supplierName;
  }

  getSupplierName(): string {
    return this.supplierName;
  }

  isLowStock(): Boolean {
    return this.quantity <= this.lowStockThreshold;
  }
}
