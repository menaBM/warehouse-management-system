import { Menu } from "./src/view/menu";
import { Inventory } from "./src/model/Inventory";
import { OrderController } from "./src/controller/OrderController";
import { MainController } from "./src/controller/MainController";
import { SupplierController } from "./src/controller/SupplierController";
import { BaseController } from "./src/controller/BaseController";
import { InventoryController } from "./src/controller/InventoryController";
import { CustomerOrder } from "./src/model/order/CustomerOrder";
import { SupplierOrder } from "./src/model/order/SupplierOrder";

const menu = new Menu()
const inventory = new Inventory()

const customerOrderController = new OrderController(inventory, menu, CustomerOrder)
const supplierOrderController = new OrderController(inventory, menu, SupplierOrder)
const supplierController = new SupplierController(menu)
const inventoryController = new InventoryController(menu)

supplierController.addNewAction("Place Purchase Order", supplierOrderController.rootAction.bind(supplierOrderController))

const menuControllers: Map<string, BaseController> =  new Map()
menuControllers.set('Place Order', customerOrderController)
menuControllers.set('Manage Suppliers', supplierController)
menuControllers.set('Manage Inventory', inventoryController)

const mainController = new MainController(menu, menuControllers)
mainController.rootAction()