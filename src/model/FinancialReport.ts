import { Order } from "./order/Order";

export class FinancialReport {
  private purchaseCosts: number = 0;
  private salesRevenue: number = 0;
  private stockPurchases: Map<string, number> = new Map();
  private sales: Map<string, number> = new Map();

  updateSalesRevenue(order: Order) {
    this.salesRevenue += order.getTotal();

    order.getAllItems().forEach((quantity, item) => {
      const name: string = item.getName();
      let total: number = this.sales.get(name) ?? 0;
      total += quantity * item.getPrice();
      this.sales.set(name, total);
    });
  }

  updatePurchaseCosts(order: Order) {
    this.purchaseCosts += order.getTotal();

    order.getAllItems().forEach((quantity, item) => {
      const name: string = item.getName();
      let total: number = this.stockPurchases.get(name) ?? 0;
      total += quantity * item.getSupplierPrice();
      this.stockPurchases.set(name, total);
    });
  }

  generateSummaryReport(): Array<Array<string>> {
    const netIncome = this.salesRevenue - this.purchaseCosts;
    let report: Array<Array<string>> = [
      [
        "Stock Purchase Costs",
        "Sales Revenue",
        `Net income ${netIncome === 0 ? "" : netIncome > 0 ? "(Profit)" : "(Loss)"}`,
      ],
      [
        "£" + this.purchaseCosts,
        "£" + this.salesRevenue,
        "£" + Math.abs(netIncome),
      ],
    ];
    return report;
  }

  generateFullReport(): Array<Array<string>> {
    const netIncome = this.salesRevenue - this.purchaseCosts;
    let report: Array<Array<string>> = [["Expenses"]];
    report = report.concat(
      Array.from(this.stockPurchases).map((item) => [item[0], "£" + item[1]]),
    );
    report.push(
      ["Stock Purchase Costs", "£" + this.purchaseCosts],
      ["Revenue"],
    );
    report = report.concat(
      Array.from(this.sales).map((item) => [item[0], "£" + item[1]]),
    );
    report.push(
      ["Sales Revenue", "£" + this.salesRevenue],
      [
        `Net income ${netIncome === 0 ? "" : netIncome > 0 ? "(Profit)" : "(Loss)"}`,
        "£" + Math.abs(netIncome),
      ],
    );
    return report;
  }
}
