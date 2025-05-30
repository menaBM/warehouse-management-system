import { Inventory } from "../model/Inventory";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class InventoryController extends BaseController {
  private inventory: Inventory;

  constructor(menu: Menu, inventory: Inventory) {
    super(menu);
    this.inventory = inventory;
    this.actions = new Map([
      ["Stock Report", this.stockReportAction],
      ["Low Stock Items", this.lowStockAction],
      ["Check Item Stock", this.checkStockAction],
      ["Edit Item Stock", this.editStockAction],
      ["Add new Inventory", this.addInventoryAction],
    ]);
  }

  private stockReportAction = () => {
    this.menu.drawTable(this.inventory.generateReport());
  };

  private lowStockAction = () => {
    // handle if no low stock
    this.menu.drawTable(this.inventory.getLowStock());
  };

  private checkStockAction = async () => {
    const item = await this.getItemInput();
    this.menu.outputMessage(`${item.getName()}: ${item.getQuantity()}`);
  };

  private editStockAction = async () => {
    const item = await this.getItemInput();
    const quantity: number = await this.getNumberInput(
      "Enter quantity:",
      "Invalid quantity",
    );
    this.inventory.updateStock(
      new Map([[item, item.getQuantity() - quantity]]),
    );
    this.menu.outputMessage(`${item.getName()} quantity set to ${quantity}`);
  };

  private addInventoryAction = async () => {
    let name: string;
    let supplierName: string;

    while (true) {
      name = await this.menu.getInput("Enter item name:");
      if (name !== "" && !this.inventory.lookupItem(name)) {
        break;
      }
      this.menu.outputMessage("Invalid item name");
    }

    const price: number = await this.getNumberInput(
      "Enter item price:",
      "Invalid price",
    );
    const supplierPrice: number = await this.getNumberInput(
      "Enter supplier price for item:",
      "Invalid price",
    );
    const quantity: number = await this.getNumberInput(
      "Enter quantity of item currently in stock:",
      "Invalid quantity",
    );
    const lowStockThreshold: number = await this.getNumberInput(
      "Enter threshold for item to be considered low stock:",
      "Invalid threshold",
    );

    while (true) {
      supplierName = await this.menu.getInput("Enter supplier name:");
      if (supplierName !== "") {
        break;
      }
      this.menu.outputMessage(`Invalid supplier name`);
    }

    this.inventory.newItem(
      name,
      price,
      supplierPrice,
      quantity,
      lowStockThreshold,
      supplierName,
    );
  };

  async getItemInput() {
    while (true) {
      const itemName = await this.menu.getInput("Enter item name:");
      const item = this.inventory.lookupItem(itemName);
      if (item) {
        return item;
      }
      this.menu.outputMessage(`${itemName} not found in inventory`);
    }
  }

  private async getNumberInput(
    message: string,
    errorMessage: string,
  ): Promise<number> {
    while (true) {
      const input: number = Number(await this.menu.getInput(message));
      if (input >= 0) {
        return input;
      }
      this.menu.outputMessage(errorMessage);
    }
  }
}
