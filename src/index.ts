import { Menu } from "./view/menu";
import { Inventory } from "./model/Inventory";
import { OrderController } from "./controller/OrderController";
import { SupplierController } from "./controller/SupplierController";
import { BaseController } from "./controller/BaseController";
import { InventoryController } from "./controller/InventoryController";
import { CustomerOrder } from "./model/order/CustomerOrder";
import { SupplierOrder } from "./model/order/SupplierOrder";
import { SupplierManager } from "./model/SupplierManager";

const menu = new Menu()
const inventory = new Inventory()
const supplierManager = new SupplierManager()

SupplierOrder.supplierManager = supplierManager;
const customerOrderController = new OrderController(inventory, menu, CustomerOrder)
const supplierOrderController = new OrderController(inventory, menu, SupplierOrder)
const supplierController = new SupplierController(menu, supplierManager)
const inventoryController = new InventoryController(menu, inventory)

supplierController.addNewAction("New Purchase Order", supplierOrderController.rootAction.bind(supplierOrderController))

const baseController = new BaseController(menu)
baseController.addNewAction('Place Order', customerOrderController.rootAction.bind(customerOrderController))
baseController.addNewAction('Manage Suppliers', supplierController.rootAction.bind(supplierController))
baseController.addNewAction('Manage Inventory', inventoryController.rootAction.bind(inventoryController))

baseController.rootAction().then(() => menu.quit())