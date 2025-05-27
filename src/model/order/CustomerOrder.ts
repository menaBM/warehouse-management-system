import { OrderStatus } from "../../types";
import { Inventory } from "../Inventory";
import { Order } from "./Order";

export class CustomerOrder extends Order {
  complete (inventory: Inventory): Array<string> {
    this.setStatus(OrderStatus.Dispatched)

    const stockAlerts = inventory.updateStock(this.getAllItems())
    return stockAlerts
  }
} 