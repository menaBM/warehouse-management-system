import { Menu } from "./src/view/menu";
import { Inventory } from "./src/model/Inventory";
import { OrderController } from "./src/controller/OrderController";
import { MainController } from "./src/controller/MainController";
import { SupplierController } from "./src/controller/SupplierController";
import { BaseController } from "./src/controller/BaseController";
import { InventoryController } from "./src/controller/InventoryController";

const menu = new Menu()
const inventory = new Inventory()

const orderController = new OrderController(inventory, menu)
const supplierController = new SupplierController(menu)

const menuControllers: Map<string, BaseController> =  new Map()
menuControllers.set('Place Order', orderController)
menuControllers.set('Manage Suppliers', supplierController)
menuControllers.set('Manage Inventory', inventoryController)

const mainController = new MainController(menu, menuControllers)
mainController.rootAction()