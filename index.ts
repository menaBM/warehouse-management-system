import { Menu } from "./src/view/menu";
import { Inventory } from "./src/model/Inventory";
import { OrderController } from "./src/controller/OrderController";
import { MainController } from "./src/controller/MainController";

const menu = new Menu()
const inventory = new Inventory()
const orderController = new OrderController(inventory, menu)
const menuControllers =  new Map([ ['Place Order', orderController]])
const mainController = new MainController(menu, menuControllers)

mainController.rootAction()