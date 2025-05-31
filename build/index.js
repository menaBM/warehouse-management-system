"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./view/menu");
const Inventory_1 = require("./model/Inventory");
const OrderController_1 = require("./controller/OrderController");
const SupplierController_1 = require("./controller/SupplierController");
const BaseController_1 = require("./controller/BaseController");
const InventoryController_1 = require("./controller/InventoryController");
const CustomerOrder_1 = require("./model/order/CustomerOrder");
const SupplierManager_1 = require("./model/SupplierManager");
const FinancialReport_1 = require("./model/FinancialReport");
const FinanceController_1 = require("./controller/FinanceController");
const menu = new menu_1.Menu();
const inventory = new Inventory_1.Inventory();
const supplierManager = new SupplierManager_1.SupplierManager();
const financialReport = new FinancialReport_1.FinancialReport();
const supplier1 = {
    name: "supplier 1",
    email: "email@address",
    phoneNumber: 1234,
};
const supplier2 = {
    name: "supplier 2",
    email: "test@email",
    phoneNumber: 987,
};
supplierManager.createSupplier(supplier1);
supplierManager.createSupplier(supplier2);
const testItems = [
    ["item 1", 6, 3, 34, 5, "supplier 1"],
    ["item 2", 10, 1, 200, 50, "supplier 1"],
    ["item 3", 22, 2, 100, 20, "supplier 2"],
    ["item 4", 12, 1, 23, 10, "supplier 2"],
];
testItems.forEach((item) => inventory.newItem(...item));
const customerOrderController = new OrderController_1.OrderController(inventory, menu, CustomerOrder_1.CustomerOrder, financialReport);
const supplierController = new SupplierController_1.SupplierController(menu, supplierManager, inventory, financialReport);
const inventoryController = new InventoryController_1.InventoryController(menu, inventory);
const financeController = new FinanceController_1.FinanceController(menu, financialReport);
const baseController = new BaseController_1.BaseController(menu);
baseController.addNewAction("Place Order", customerOrderController.rootAction.bind(customerOrderController));
baseController.addNewAction("Manage Suppliers", supplierController.rootAction.bind(supplierController));
baseController.addNewAction("Manage Inventory", inventoryController.rootAction.bind(inventoryController));
baseController.addNewAction("Financial Reporting", financeController.rootAction.bind(financeController));
baseController.rootAction().then(() => menu.quit());
