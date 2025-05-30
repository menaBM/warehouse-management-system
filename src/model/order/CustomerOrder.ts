import { OrderStatus } from "../../types";
import { FinancialReport } from "../FinancialReport";
import { Inventory } from "../Inventory";
import { Order } from "./Order";

export class CustomerOrder extends Order {
  complete(
    inventory: Inventory,
    financialReport: FinancialReport,
  ): Array<string> {
    this.setStatus(OrderStatus.Dispatched);
    financialReport.updateSalesRevenue(this);
    const stockAlerts = inventory.updateStock(this.getAllItems());
    return stockAlerts;
  }
}
