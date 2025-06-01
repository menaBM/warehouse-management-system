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
  ): void {
    const item: Item = new Item(
      name,
      price,
      supplierPrice,
      quantity,
      lowStockThreshold,
      supplierName,
    );
    this.items.set(name, item);
  }

  addItem(item: Item): void {
    this.items.set(item.getName(), item);
  }

  lookupItem(name: string): Item | undefined {
    return this.items.get(name);
  }

  getItems(): Map<string, Item> {
    return this.items;
  }

  generateReport(): Array<Array<string>> {
    let report: Array<Array<string>> = [["Item", "Quantity", "Low Stock"]];
    this.items.forEach((item) => {
      const isLowStock: string = item.isLowStock() ? "Yes" : "No";
      report.push([item.getName(), item.getQuantity().toString(), isLowStock]);
    });
    return report;
  }

  getLowStock(): Array<Array<string>> {
    let lowStock: Array<Array<string>> = [["Item", "Quantity"]];
    let items: Array<Item> = [...this.items.values()].filter((item) =>
      item.isLowStock(),
    );
    items.map((item) =>
      lowStock.push([item.getName(), item.getQuantity().toString()]),
    );
    return lowStock;
  }

  updateStock(items: Map<Item, number>): Array<string> {
    let alerts: Array<string> = new Array<string>();
    items.forEach((quantity, item) => {
      const stock: Item | undefined = this.items.get(item.getName());

      if (!stock) return alerts;

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
}
