import { OrderStatus, SupplierDetails } from "../types";
import Item from "./Item";
import { SupplierOrder } from "./order/SupplierOrder";
import { PurchaseOrderArchive } from "./PurchaseOrderArchive";
import { Supplier } from "./Supplier";

export class SupplierManager {
  private suppliers: Map<string, Supplier> = new Map();
  private purchaseOrderArchive: PurchaseOrderArchive =
    new PurchaseOrderArchive();

  createSupplier(supplierDetails: SupplierDetails) {
    let supplier = new Supplier(
      supplierDetails.name,
      supplierDetails.email,
      supplierDetails.phoneNumber,
    );
    this.suppliers.set(supplierDetails.name, supplier);
  }

  getSupplier(supplierName: string) {
    return this.suppliers.get(supplierName);
  }

  editSupplier(supplier: Supplier, supplierDetails: SupplierDetails) {
    if (supplier.getName() !== supplierDetails.name) {
      this.suppliers.delete(supplier.getName());
    }

    supplier.setName(supplierDetails.name);
    supplier.setEmail(supplierDetails.email);
    supplier.setPhoneNumber(supplierDetails.phoneNumber);

    this.suppliers.set(supplier.getName(), supplier);
  }

  removeSupplier(supplier: Supplier) {
    this.suppliers.delete(supplier.getName());
  }

  getAllSuppliers(): Array<Array<string>> {
    let suppliers = new Array<Array<string>>();
    this.suppliers.forEach((supplier) => {
      suppliers.push([
        supplier.getName(),
        supplier.getEmail(),
        supplier.getPhoneNumber().toString(),
      ]);
    });
    return suppliers;
  }

  addSupplierOrder(order: SupplierOrder) {
    this.purchaseOrderArchive.addOrder(order);
  }

  // getSupplierOrder (orderNumber: number) {
  //     return this.purchaseOrderArchive.getOrder(orderNumber)
  // }

  viewOrders(): Map<number, SupplierOrder> {
    // rename get all orders
    return this.purchaseOrderArchive.getAllOrders();
  }

  processDelivery(orderNumber: number): Map<Item, number> {
    let order = this.purchaseOrderArchive.getOrder(orderNumber);
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
