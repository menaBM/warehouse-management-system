"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceController = void 0;
const BaseController_1 = require("./BaseController");
class FinanceController extends BaseController_1.BaseController {
    constructor(menu, financialReport) {
        super(menu);
        this.summaryReportAction = () => __awaiter(this, void 0, void 0, function* () {
            this.menu.drawTable(this.financialReport.generateSummaryReport());
        });
        this.fullReportAction = () => __awaiter(this, void 0, void 0, function* () {
            this.menu.drawTable(this.financialReport.generateFullReport());
        });
        this.financialReport = financialReport;
        this.actions = new Map([
            ['Generate Summary Report', this.summaryReportAction],
            ['Generate Full Report', this.fullReportAction]
        ]);
    }
}
exports.FinanceController = FinanceController;
