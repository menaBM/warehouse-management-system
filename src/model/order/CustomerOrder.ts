import { Inventory } from "../Inventory";
import { Order } from "./Order";

export class CustomerOrder extends Order {
  complete (inventory: Inventory) {
    const stockAlerts = inventory.updateStock(this.getAllItems())
    return stockAlerts
  }
} 