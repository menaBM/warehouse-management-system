import { OrderStatus } from "../../types";
import { FinancialReport } from "../FinancialReport";
import { Inventory } from "../Inventory";
import { Item } from "../Item";

export class Order {
  private total: number = 0;
  private status: OrderStatus = OrderStatus.Processing;
  private items: Map<Item, number>;

  constructor() {
    this.total = 0;
    this.items = new Map<Item, number>();
  }

  getAllItems(): Map<Item, number> {
    return this.items;
  }

  setStatus(status: OrderStatus) {
    this.status = status;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  setItem(item: Item, quantity: number) {
    const existingItemQuantity = this.items.get(item);
    if (existingItemQuantity) {
      this.total -= existingItemQuantity * this.getItemPrice(item);
    }
    this.items.set(item, quantity);
    this.total += this.getItemPrice(item) * quantity;
  }

  hasItem(item: Item) {
    return this.items.has(item);
  }

  removeItem(item: Item) {
    const quantity = this.items.get(item);
    if (quantity) {
      this.total -= this.getItemPrice(item) * quantity;
    }
    this.items.delete(item);
  }

  protected getItemPrice(item: Item): number {
    return item.getPrice();
  }

  getTotal(): number {
    return this.total;
  }

  getSummary() {
    let order: Array<Array<string>> = [["Name", "Quantity", "Price"]];
    this.items.forEach((quantity, item) => {
      const price: number = this.getItemPrice(item) * quantity;
      order.push([item.getName(), quantity.toString(), price.toString()]);
    });
    return order;
  }

  complete(
    inventory: Inventory,
    financialReport: FinancialReport,
  ): Array<string> {
    this.status = OrderStatus.Processed;
    return ["Order completed"];
  }

  isValidQuantity(item: Item, quantity: number): boolean {
    if (item.getQuantity() >= quantity) {
      return true;
    }
    return false;
  }
}
