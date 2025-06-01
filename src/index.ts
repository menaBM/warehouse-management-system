import { Menu } from "./view/menu";
import { Inventory } from "./model/Inventory";
import { OrderController } from "./controller/OrderController";
import { SupplierController } from "./controller/SupplierController";
import { BaseController } from "./controller/BaseController";
import { InventoryController } from "./controller/InventoryController";
import { CustomerOrder } from "./model/order/CustomerOrder";
import { SupplierManager } from "./model/SupplierManager";
import { FinancialReport } from "./model/FinancialReport";
import { FinanceController } from "./controller/FinanceController";
import { SupplierDetails } from "./types";

const menu: Menu = new Menu();
const inventory: Inventory = new Inventory();
const supplierManager: SupplierManager = new SupplierManager();
const financialReport: FinancialReport = new FinancialReport();

const supplier1: SupplierDetails = {
  name: "supplier 1",
  email: "email@address",
  phoneNumber: 1234,
};
const supplier2: SupplierDetails = {
  name: "supplier 2",
  email: "test@email",
  phoneNumber: 987,
};
supplierManager.createSupplier(supplier1);
supplierManager.createSupplier(supplier2);

const testItems: Array<[string, number, number, number, number, string]> = [
  ["item 1", 6, 3, 34, 5, "supplier 1"],
  ["item 2", 10, 1, 200, 50, "supplier 1"],
  ["item 3", 22, 2, 100, 20, "supplier 2"],
  ["item 4", 12, 1, 23, 10, "supplier 2"],
];
testItems.forEach((item) => inventory.newItem(...item));

const customerOrderController: OrderController = new OrderController(
  inventory,
  menu,
  CustomerOrder,
  financialReport,
);
const supplierController: SupplierController = new SupplierController(
  menu,
  supplierManager,
  inventory,
  financialReport,
);
const inventoryController: InventoryController = new InventoryController(
  menu,
  inventory,
);
const financeController: FinanceController = new FinanceController(
  menu,
  financialReport,
);

const baseController: BaseController = new BaseController(menu);
baseController.addNewAction(
  "Place Order",
  customerOrderController.rootAction.bind(customerOrderController),
);
baseController.addNewAction(
  "Manage Suppliers",
  supplierController.rootAction.bind(supplierController),
);
baseController.addNewAction(
  "Manage Inventory",
  inventoryController.rootAction.bind(inventoryController),
);
baseController.addNewAction(
  "Financial Reporting",
  financeController.rootAction.bind(financeController),
);

baseController.rootAction().then(() => menu.quit());
