import { OrderStatus } from "../../types";
import { SupplierManager } from "../SupplierManager";
import { Order } from "./Order";
import { Inventory } from "../Inventory";
import Item from "../Item";
import { FinancialReport } from "../FinancialReport";

export class SupplierOrder extends Order {
  public static supplierManager: SupplierManager;

  private orderNumber: number | undefined = undefined;
  // date: Date;

  setOrderNumber (orderNumber: number) {
    this.orderNumber = orderNumber;
  }

  getOrderNumber (): number | undefined {
    return this.orderNumber
  }

  getSummary() {
      let order: Array<Array<string>> = [["Name", "Quantity", "Price"]]
      this.getAllItems().forEach((quantity, item) => {
        const price: number = item.getPrice() * quantity; // use supplier price instead
        order.push([item.getName(), quantity.toString(), price.toString()])
      })
      return order;
  }

  complete (inventory: Inventory, financialReport: FinancialReport): Array<string> {
    // set supplier name 
    // set order number? 

    this.setStatus(OrderStatus.Processed)
    SupplierOrder.supplierManager.addSupplierOrder(this)
    financialReport.updatePurchaseCosts(this)
    return [];
  }

  isValidQuantity(item: Item, quantity: number): boolean {
    return true;
  }
} 