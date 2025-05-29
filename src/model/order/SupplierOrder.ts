import { OrderStatus } from "../../types";
import { SupplierManager } from "../SupplierManager";
import { Order } from "./Order";
import { Inventory } from "../Inventory";
import Item from "../Item";
import { FinancialReport } from "../FinancialReport";

export class SupplierOrder extends Order {
  private supplierName: string | undefined = undefined;

  getSupplierName (): string {
    return this.supplierName ?? ""
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
    this.supplierName = this.getAllItems().keys().next().value?.getSupplierName()

    this.setStatus(OrderStatus.Processed)
    financialReport.updatePurchaseCosts(this)
    return [];
  }

  isValidQuantity(item: Item, quantity: number): boolean {
    return true; // assume no quantity limit on items ordered from supplier
  }

  protected getItemPrice(item: Item): number {
    return item.getSupplierPrice()
  }
} 