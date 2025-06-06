import { OrderStatus } from "../types";
import { SupplierOrder } from "./order/SupplierOrder";

export class PurchaseOrderArchive {
  private nextOrderNumber: number = 1;
  private orders: Map<number, SupplierOrder> = new Map();

  addOrder(order: SupplierOrder): void {
    const orderNumber: number = this.nextOrderNumber;
    this.orders.set(orderNumber, order);
    this.nextOrderNumber++;
  }

  getOrder(orderNumber: number): SupplierOrder | undefined {
    return this.orders.get(orderNumber);
  }

  getAllOrders(): Map<number, SupplierOrder> {
    return this.orders;
  }

  getUndeliveredOrders(): Array<number> {
    return Array.from(this.orders.entries())
      .filter((order) => order[1].getStatus() !== OrderStatus.Delivered)
      .map((order) => order[0]);
  }
}
