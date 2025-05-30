"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const Supplier_1 = require("../model/Supplier"); // not invluded in uml diagram - refactor away
const BaseController_1 = require("./BaseController");
class SupplierController extends BaseController_1.BaseController {
  constructor(menu, supplierManager) {
    super(menu);
    this.addAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        // change to supplierManager.createSupplier and move logic away
        const supplierDetails = yield this.getSupplierInput(
          "Please enter details for new supplier",
        );
        let supplier = new Supplier_1.Supplier(
          supplierDetails.name,
          supplierDetails.email,
          supplierDetails.phoneNumber,
          supplierDetails.deliveryTimeInDays,
        );
        // verify not already existing supplier
        this.supplierManager.addSupplier(supplier);
      });
    this.editAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        const name = yield this.menu.getInput(
          "Enter name of supplier to edit:",
        );
        let supplier = this.supplierManager.getSupplier(name);
        // confirm exists already and handle if not
        // this.menu.outputMessage(`${itemName} not found in inventory`)
        if (!supplier) {
          return;
        } // causing it to go back to the menu if no supplier entered - handle properly
        //output current details
        const supplierDetails = yield this.getSupplierInput(
          "Please enter new details for supplier (enter to leave unchanged)",
          {
            name: supplier.getName(),
            email: supplier.getEmail(),
            phoneNumber: supplier.getPhoneNumber(),
            deliveryTimeInDays: supplier.getDaysToDeliver(),
          },
        );
        this.supplierManager.editSupplier(supplier, supplierDetails);
      });
    this.deleteAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        const name = yield this.menu.getInput(
          "Enter name of supplier to delete:",
        );
        let supplier = this.supplierManager.getSupplier(name);
        // confirm exists already and handle if not
        // this.menu.outputMessage(`${name} not found in supplier directory`)
        if (!supplier) {
          return;
        } // causing it to go back to the menu if no supplier enterered
        this.supplierManager.removeSupplier(name);
      });
    this.viewAction = () =>
      __awaiter(this, void 0, void 0, function* () {
        //   console.log("view action ", this.supplierManager.getAllSuppliers())
        //       for (const [key,value] of this.supplierManager.getAllSuppliers().entries()) {
        //           console.log(key, value)
        //         };
        // this.menu.drawTable()
      });
    this.orderHistoryAction = () => {
      let orders = this.supplierManager.viewOrders();
      let orderSummaries = [["Order Number", "Supplier Name", "Order Status"]];
      orders.forEach((order) => {
        const orderNumber = order.getOrderNumber();
        if (!orderNumber) {
          return;
        }
        orderSummaries.push([
          orderNumber.toString(),
          "supplier name",
          "order status",
        ]);
      });
      this.menu.drawTable(orderSummaries);
    };
    this.supplierManager = supplierManager;
    this.actions = new Map([
      ["Add New Supplier", this.addAction],
      ["Edit Supplier", this.editAction],
      ["Delete Supplier", this.deleteAction],
      ["Order history", this.orderHistoryAction],
    ]); //, ['View All Suppliers', this.viewAction] ])
  }
  getSupplierInput(message, supplierDetails) {
    return __awaiter(this, void 0, void 0, function* () {
      let name, email, phoneNumber, deliveryTimeInDays;
      this.menu.outputMessage(message);
      // output an error message if incorrect input
      console.log(supplierDetails);
      while (true) {
        const input = yield this.menu.getInput("Name:");
        name =
          input !== ""
            ? input
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.name;
        if (name !== undefined) {
          break;
        }
      }
      while (true) {
        const input = yield this.menu.getInput("Email:");
        email =
          input !== ""
            ? input
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.email;
        if (email !== undefined && email.includes("@")) {
          // also check for no spaces, use regex
          break;
        }
      }
      while (true) {
        const input = yield this.menu.getInput("Phone number:");
        phoneNumber =
          input !== ""
            ? Number(input)
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.phoneNumber;
        if (phoneNumber !== undefined && Number.isInteger(phoneNumber)) {
          break;
        }
      }
      while (true) {
        const input = yield this.menu.getInput(
          "Time in days for supplier deliveries to arrive:",
        );
        deliveryTimeInDays =
          input !== ""
            ? Number(input)
            : supplierDetails === null || supplierDetails === void 0
              ? void 0
              : supplierDetails.deliveryTimeInDays;
        if (
          deliveryTimeInDays !== undefined &&
          Number.isInteger(deliveryTimeInDays)
        ) {
          break;
        }
      }
      return {
        name,
        email,
        phoneNumber: Number(phoneNumber),
        deliveryTimeInDays: Number(deliveryTimeInDays),
      };
    });
  }
}
exports.SupplierController = SupplierController;
