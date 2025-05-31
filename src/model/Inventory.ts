import { Item } from "./Item";

export class Inventory {
  private items = new Map<string, Item>();

  newItem(
    name: string,
    price: number,
    supplierPrice: number,
    quantity: number,
    lowStockThreshold: number,
    supplierName: string,
  ) {
    const item = new Item(
      name,
      price,
      supplierPrice,
      quantity,
      lowStockThreshold,
      supplierName,
    );
    this.items.set(name, item);
  }

  addItem(item: Item) {
    this.items.set(item.getName(), item);
  }

  lookupItem(name: string): Item | undefined {
    return this.items.get(name);
  }

  getItems(): Map<string, Item> {
    return this.items;
  }

  generateReport() {
    let report: Array<Array<string>> = [["Item", "Quantity", "Low Stock"]];
    this.items.forEach((item) => {
      const isLowStock: string = item.isLowStock() ? "Yes" : "No";
      report.push([item.getName(), item.getQuantity().toString(), isLowStock]);
    });
    return report;
  }

  getLowStock(): Array<Array<string>> {
    let lowStock: Array<Array<string>> = [["Item", "Quantity"]];
    let items = [...this.items.values()].filter((item) => item.isLowStock());
    items.map((item) =>
      lowStock.push([item.getName(), item.getQuantity().toString()]),
    );
    return lowStock;
  }

  updateStock(items: Map<Item, number>): Array<string> {
    //need to check change is valid

    let alerts = new Array<string>();
    items.forEach((quantity, item) => {
      const stock = this.items.get(item.getName());

      if (!stock) return alerts;

      // check sufficient stock
      stock.setQuantity(stock.getQuantity() - quantity);

      if (stock.isLowStock()) {
        alerts.push(
          `LOW STOCK: Current quantity of ${stock.getName()} is ${stock.getQuantity()}`,
        );
      }
      this.items.set(stock.getName(), stock);
    });
    return alerts;
  }

  // checkInStock (item: Item, quantity: number) { // validate quantity not negative
  //   const stock = this.items.get(item.getName())
  //   if ( stock ) {
  //     return stock ? stock.getQuantity() >= quantity : false;
  //   }
  //   return false;
  // }
}
