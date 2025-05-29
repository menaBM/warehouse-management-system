import { Menu } from "./view/menu";
import { Inventory } from "./model/Inventory";
import { OrderController } from "./controller/OrderController";
import { SupplierController } from "./controller/SupplierController";
import { BaseController } from "./controller/BaseController";
import { InventoryController } from "./controller/InventoryController";
import { CustomerOrder } from "./model/order/CustomerOrder";
import { SupplierOrder } from "./model/order/SupplierOrder";
import { SupplierManager } from "./model/SupplierManager";
import { FinancialReport } from "./model/FinancialReport";
import { FinanceController } from "./controller/FinanceController";

const menu = new Menu()
const inventory = new Inventory()
const supplierManager = new SupplierManager()
const financialReport = new FinancialReport()

const testItems: Array<[string, number, number, number, number]>  = [
    ["item 1", 6, 3, 34, 5],
    ["item 2", 10, 1, 200, 50],
    ["item 3", 22, 2, 100, 20],
    ["item 4", 12, 1,  23, 10]
]
testItems.forEach(item => inventory.addItem(...item))

SupplierOrder.supplierManager = supplierManager;
const customerOrderController = new OrderController(inventory, menu, CustomerOrder, financialReport)
const supplierOrderController = new OrderController(inventory, menu, SupplierOrder, financialReport)
const supplierController = new SupplierController(menu, supplierManager, inventory)
const inventoryController = new InventoryController(menu, inventory)
const financeController = new FinanceController(menu, financialReport)

supplierController.addNewAction("New Purchase Order", supplierOrderController.rootAction.bind(supplierOrderController))

const baseController = new BaseController(menu)
baseController.addNewAction('Place Order', customerOrderController.rootAction.bind(customerOrderController))
baseController.addNewAction('Manage Suppliers', supplierController.rootAction.bind(supplierController))
baseController.addNewAction('Manage Inventory', inventoryController.rootAction.bind(inventoryController))
baseController.addNewAction('Financial Reporting', financeController.rootAction.bind(financeController))

baseController.rootAction().then(() => menu.quit())