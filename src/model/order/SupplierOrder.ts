import { SupplierManager } from "../SupplierManager";
import { Order } from "./Order";

export class SupplierOrder extends Order {
  static supplierManager: SupplierManager;

  private orderNumber: number | undefined = undefined;

  // status: Enum
  // date: Date;

   getSummary() {
      let order: Array<Array<string>> = [["Name", "Quantity", "Price"]]
      this.getAllItems().forEach((quantity, item) => {
        const price: number = item.getPrice() * quantity; // use supplier price instead
        order.push([item.getName(), quantity.toString(), price.toString()])
      })
      return order;
    }

  complete () {

    // set order status
    // set supplier name 

    SupplierOrder.supplierManager.addSupplierOrder(this)

    // add number to supplier order history
  }

 setOrderNumber (orderNumber: number) {
    this.orderNumber = orderNumber;
  }

  getOrderNumber (): number | undefined {
    return this.orderNumber
  }
} 