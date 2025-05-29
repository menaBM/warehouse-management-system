"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialReport = void 0;
class FinancialReport {
    constructor() {
        this.purchaseCosts = 0;
        this.salesRevenue = 0;
        this.stockPurchases = new Map();
        this.sales = new Map();
    }
    updateSalesRevenue(order) {
        this.salesRevenue += order.getTotal();
        order.getAllItems().forEach((quantity, item) => {
            var _a;
            const name = item.getName();
            let total = (_a = this.sales.get(name)) !== null && _a !== void 0 ? _a : 0;
            total += quantity * item.getPrice();
            this.sales.set(name, total);
        });
    }
    updatePurchaseCosts(order) {
        this.purchaseCosts += order.getTotal();
        order.getAllItems().forEach((quantity, item) => {
            var _a;
            const name = item.getName();
            let total = (_a = this.stockPurchases.get(name)) !== null && _a !== void 0 ? _a : 0;
            total += quantity * item.getSupplierPrice();
            this.stockPurchases.set(name, total);
        });
    }
    generateSummaryReport() {
        const netIncome = this.salesRevenue - this.purchaseCosts;
        let report = [
            [
                "Stock Purchase Costs",
                "Sales Revenue",
                `Net income ${netIncome === 0 ? "" : (netIncome > 0 ? "(Profit)" : "(Loss)")}`
            ],
            [
                "£" + this.purchaseCosts,
                "£" + this.salesRevenue,
                "£" + Math.abs(netIncome)
            ]
        ];
        return report;
    }
    generateFullReport() {
        const netIncome = this.salesRevenue - this.purchaseCosts;
        let report = [["Expenses"]];
        report = report.concat(Array.from(this.stockPurchases).map(item => [item[0], "£" + item[1]]));
        report.push(['Stock Purchase Costs', "£" + this.purchaseCosts], ["Revenue"]);
        report = report.concat(Array.from(this.sales).map(item => [item[0], "£" + item[1]]));
        report.push(['Sales Revenue', "£" + this.salesRevenue], [`Net income ${netIncome === 0 ? "" : (netIncome > 0 ? "(Profit)" : "(Loss)")}`, "£" + Math.abs(netIncome)]);
        return report;
    }
}
exports.FinancialReport = FinancialReport;
