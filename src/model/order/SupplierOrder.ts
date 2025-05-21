import Item from "../Item";
import { Order } from "./Order";

export class SupplierOrder extends Order {

   getStockUpdates(): Map<Item, number> {
      return new Map;
  }

  complete () {

  }
} 