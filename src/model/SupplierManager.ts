import { OrderStatus, SupplierDetails } from "../types";
import { Item } from "./Item";
import { SupplierOrder } from "./order/SupplierOrder";
import { PurchaseOrderArchive } from "./PurchaseOrderArchive";
import { Supplier } from "./Supplier";

export class SupplierManager {
  private suppliers: Map<string, Supplier> = new Map();
  private purchaseOrderArchive: PurchaseOrderArchive =
    new PurchaseOrderArchive();

  createSupplier(supplierDetails: SupplierDetails): void {
    let supplier: Supplier = new Supplier(
      supplierDetails.name,
      supplierDetails.email,
      supplierDetails.phoneNumber,
    );
    this.suppliers.set(supplierDetails.name, supplier);
  }

  getSupplier(supplierName: string): Supplier | undefined {
    return this.suppliers.get(supplierName);
  }

  editSupplier(supplier: Supplier, supplierDetails: SupplierDetails): void {
    const name: string = supplier.getName();
    if (name !== supplierDetails.name) {
      this.suppliers.delete(name);
    }

    supplier.setName(supplierDetails.name);
    supplier.setEmail(supplierDetails.email);
    supplier.setPhoneNumber(supplierDetails.phoneNumber);

    this.suppliers.set(supplierDetails.name, supplier);
  }

  removeSupplier(supplier: Supplier): void {
    this.suppliers.delete(supplier.getName());
  }

  getAllSuppliers(): Array<Array<string>> {
    let suppliers: Array<Array<string>> = new Array<Array<string>>();
    this.suppliers.forEach((supplier) => {
      suppliers.push([
        supplier.getName(),
        supplier.getEmail(),
        supplier.getPhoneNumber().toString(),
      ]);
    });
    return suppliers;
  }

  addSupplierOrder(order: SupplierOrder): void {
    this.purchaseOrderArchive.addOrder(order);
  }

  getAllOrders(): Map<number, SupplierOrder> {
    return this.purchaseOrderArchive.getAllOrders();
  }

  processDelivery(orderNumber: number): Map<Item, number> {
    let order: SupplierOrder | undefined =
      this.purchaseOrderArchive.getOrder(orderNumber);
    let stockUpdates: Map<Item, number> = new Map<Item, number>();

    if (order) {
      order.setStatus(OrderStatus.Delivered);
      for (const [key, value] of order.getAllItems()) {
        stockUpdates.set(key, -value);
      }
    }

    return stockUpdates;
  }

  getPendingDeliveries(): Array<number> {
    return this.purchaseOrderArchive.getUndeliveredOrders();
  }
}
