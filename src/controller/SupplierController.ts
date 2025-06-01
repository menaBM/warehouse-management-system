import { SupplierDetails } from "../types";
import { Supplier } from "../model/Supplier";
import { SupplierManager } from "../model/SupplierManager";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";
import { Inventory } from "../model/Inventory";
import { OrderController } from "./OrderController";
import { FinancialReport } from "../model/FinancialReport";
import { SupplierOrder } from "../model/order/SupplierOrder";
import { Item } from "../model/Item";

export class SupplierController extends BaseController {
  private supplierManager: SupplierManager;
  private inventory: Inventory;
  private financialReport: FinancialReport;

  constructor(
    menu: Menu,
    supplierManager: SupplierManager,
    inventory: Inventory,
    financialReport: FinancialReport,
  ) {
    super(menu);
    this.inventory = inventory;
    this.supplierManager = supplierManager;
    this.financialReport = financialReport;
    this.actions = new Map([
      ["Add New Supplier", this.addAction],
      ["Edit Supplier", this.editAction],
      ["Delete Supplier", this.deleteAction],
      ["View All Suppliers", this.viewAction],
      ["Place Supplier Order", this.orderAction],
      ["Recieve Supplier Delivery", this.deliveryAction],
      ["Supplier Order history", this.orderHistoryAction],
    ]);
  }

  private async getSupplierInput(
    message: string,
    supplierDetails?: SupplierDetails,
  ): Promise<SupplierDetails> {
    let name: string | undefined;
    let email: string | undefined;
    let phoneNumber: number | undefined;
    this.menu.outputMessage(message);

    while (true) {
      const input: string = await this.menu.getInput("Name:");
      name = input !== "" ? input : supplierDetails?.name;
      if (name !== undefined) {
        break;
      }
      this.menu.outputMessage("Invalid name");
    }

    while (true) {
      const input:string  = await this.menu.getInput("Email:");
      email = input !== "" ? input : supplierDetails?.email;
      if (email !== undefined && email.includes("@")) {
        break;
      }
      this.menu.outputMessage("Invalid email");
    }

    while (true) {
      const input: string = await this.menu.getInput("Phone number:");
      phoneNumber = input !== "" ? Number(input) : supplierDetails?.phoneNumber;
      if (phoneNumber !== undefined && Number.isInteger(phoneNumber)) {
        break;
      }
      this.menu.outputMessage("Invalid phone number");
    }

    return { name, email, phoneNumber: Number(phoneNumber) };
  }

  private async getExistingSupplier(): Promise<Supplier> {
    while (true) {
      const name: string = await this.menu.getInput("Enter name of supplier:");
      let supplierFound: Supplier | undefined = this.supplierManager.getSupplier(name);
      if (supplierFound) {
        return supplierFound;
      }
      this.menu.outputMessage("Supplier not found in records");
    }
  }

  private addAction = async (): Promise<void> => {
    let supplierDetails: SupplierDetails;
    while (true) {
      supplierDetails = await this.getSupplierInput(
        "Please enter details for new supplier",
      );
      if (!this.supplierManager.getSupplier(supplierDetails.name)) {
        break;
      }
      this.menu.outputMessage("Supplier already exists in records");
    }

    this.supplierManager.createSupplier(supplierDetails);
  };

  private editAction = async (): Promise<void> => {
    let supplier: Supplier = await this.getExistingSupplier();

    const supplierDetails: SupplierDetails = await this.getSupplierInput(
      "Please enter new details for supplier (enter to leave unchanged)",
      {
        name: supplier.getName(),
        email: supplier.getEmail(),
        phoneNumber: supplier.getPhoneNumber(),
      },
    );

    this.supplierManager.editSupplier(supplier, supplierDetails);
  };

  private deleteAction = async (): Promise<void> => {
    let supplier: Supplier = await this.getExistingSupplier();
    this.supplierManager.removeSupplier(supplier);
  };

  private viewAction = async (): Promise<void> => {
    let suppliers: Array<Array<string>> = [
      ["Name", "Email", "Phone Number"],
    ].concat(this.supplierManager.getAllSuppliers());
    this.menu.drawTable(suppliers);
  };

  private orderAction = async (): Promise<void> => {
    if (this.supplierManager.getAllSuppliers().length === 0) {
      this.menu.outputMessage("No supplier records found");
      return;
    }

    let supplierName: string = (await this.getExistingSupplier()).getName();
    let supplierInventory: Inventory = new Inventory();

    let items: Map<string, Item> = this.inventory.getItems();
    const supplierItems: Array<Item> = Array.from(items.values()).filter((item) => {
      if (item.getSupplierName() === supplierName) {
        supplierInventory.addItem(item);
        return item.getName();
      }
    });

    if (supplierItems.length === 0) {
      this.menu.outputMessage("No items available to order from this supplier");
      return;
    }

    this.menu.outputMessage(
      "Items available to order from this supplier's inventory:",
    );
    this.menu.drawTable(supplierItems.map((item) => [item.getName()]));

    const supplierOrderController: OrderController = new OrderController(
      supplierInventory,
      this.menu,
      SupplierOrder,
      this.financialReport,
    );

    await supplierOrderController.rootAction();
    let order: SupplierOrder =
      supplierOrderController.getOrder() as SupplierOrder;
    this.supplierManager.addSupplierOrder(order);
  };

  private orderHistoryAction = (): void => {
    let orders: Map<number, SupplierOrder> = this.supplierManager.getAllOrders();
    let orderSummaries: Array<Array<string>> = [
      ["Order Number", "Supplier Name", "Order Status"],
    ];

    orders.forEach((order, orderNumber) => {
      orderSummaries.push([
        orderNumber.toString(),
        order.getSupplierName(),
        order.getStatus(),
      ]);
    });
    this.menu.drawTable(orderSummaries);
  };

  private deliveryAction = async (): Promise<void> => {
    let deliveries: Array<number> = this.supplierManager.getPendingDeliveries();
    if (deliveries.length < 1) {
      this.menu.outputMessage("There are currently no pending deliveries");
      return;
    }

    while (true) {
      let orderNumber: number = Number(
        await this.menu.getInput("Enter order number of delivery"),
      );
      if (!orderNumber) {
        this.menu.outputMessage("Invalid order number");
        continue;
      }
      if (deliveries.includes(orderNumber)) {
        const stockUpdates: Map<Item, number> = this.supplierManager.processDelivery(orderNumber);
        this.inventory.updateStock(stockUpdates);
        this.menu.outputMessage("Inventory updated");
        return;
      }
      this.menu.outputMessage(
        "No pending delivery found for this order number",
      );
    }
  };
}
