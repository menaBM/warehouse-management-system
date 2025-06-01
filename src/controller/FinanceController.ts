import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";
import { FinancialReport } from "../model/FinancialReport";

export class FinanceController extends BaseController {
  private financialReport: FinancialReport;

  constructor(menu: Menu, financialReport: FinancialReport) {
    super(menu);
    this.financialReport = financialReport;
    this.actions = new Map([
      ["Generate Summary Report", this.summaryReportAction],
      ["Generate Full Report", this.fullReportAction],
    ]);
  }

  summaryReportAction = async (): Promise<void> => {
    this.menu.drawTable(this.financialReport.generateSummaryReport());
  };

  fullReportAction = async (): Promise<void> => {
    this.menu.drawTable(this.financialReport.generateFullReport());
  };
}
