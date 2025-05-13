import { Menu } from "./src/view/menu";
import { Inventory } from "./src/model/Inventory";
import { OrderController } from "./src/controller/OrderController";

const menu = new Menu()
const inventory = new Inventory()
const orderController = new OrderController(inventory, menu)

orderController.rootAction()