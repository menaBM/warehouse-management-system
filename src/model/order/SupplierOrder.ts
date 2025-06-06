import { OrderStatus } from "../../types";
import { FinancialReport } from "../FinancialReport";
import { Inventory } from "../Inventory";
import { Item } from "../Item";
import { Order } from "./Order";

export class SupplierOrder extends Order {
  private supplierName: string | undefined = undefined;

  getSupplierName(): string {
    return this.supplierName ?? "";
  }

  complete(
    inventory: Inventory,
    financialReport: FinancialReport,
  ): Array<string> {
    this.supplierName = this.getAllItems()
      .keys()
      .next()
      .value?.getSupplierName();
    this.setStatus(OrderStatus.Processed);
    financialReport.updatePurchaseCosts(this);
    return [];
  }

  isValidQuantity(item: Item, quantity: number): boolean {
    return true; // assume no quantity limit on items ordered from supplier
  }

  protected getItemPrice(item: Item): number {
    return item.getSupplierPrice();
  }
}
