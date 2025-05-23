import { SupplierDetails } from "../types";
import { Supplier } from "../model/Supplier";
import { SupplierManager} from "../model/SupplierManager";
import { Menu } from "../view/menu";
import { BaseController } from "./BaseController";

export class SupplierController extends BaseController {
  private supplierManager: SupplierManager;

  constructor (menu: Menu, supplierManager: SupplierManager) {
    super(menu)

    this.supplierManager = supplierManager
    this.actions = new Map([['Add New Supplier', this.addAction], ['Edit Supplier', this.editAction], ['Delete Supplier', this.deleteAction], ["Order history", this.orderHistoryAction] ])//, ['View All Suppliers', this.viewAction] ])
  }

  async getSupplierInput (message: string, supplierDetails?: SupplierDetails): Promise<SupplierDetails> {
    let name, email, phoneNumber, deliveryTimeInDays
    this.menu.outputMessage(message)

    // output an error message if incorrect input

    console.log(supplierDetails)

    while (true) {
      const input = await this.menu.getInput("Name:")
      name =  input !== "" ? input : supplierDetails?.name
      if (name !== undefined) {
        break;
      }
    }

    while (true) {
      const input = await this.menu.getInput("Email:")
      email = input !== "" ? input :  supplierDetails?.email
      if (email !== undefined && email.includes("@")) { // also check for no spaces, use regex
        break;
      }
    }
  
    while (true) {
      const input = await this.menu.getInput("Phone number:")
      phoneNumber = input !== "" ? Number(input) : supplierDetails?.phoneNumber
      if ( phoneNumber !== undefined && Number.isInteger(phoneNumber)) {
        break;
      }
    }

    while (true) {
      const input = await this.menu.getInput("Time in days for supplier deliveries to arrive:")
      deliveryTimeInDays = input !== "" ? Number(input) : supplierDetails?.deliveryTimeInDays
      if ( deliveryTimeInDays !== undefined && Number.isInteger(deliveryTimeInDays)) {
        break;
      }
    }

    return {name, email, phoneNumber: Number(phoneNumber), deliveryTimeInDays: Number(deliveryTimeInDays)}  
  }

  addAction =  async () => {
    const supplierDetails: SupplierDetails = await this.getSupplierInput("Please enter details for new supplier")

    let supplier = new Supplier (supplierDetails.name, supplierDetails.email, supplierDetails.phoneNumber, supplierDetails.deliveryTimeInDays)

    // verify not already existing supplier

    this.supplierManager.addSupplier(supplier)
  }

  editAction =  async () => {
    const name = await this.menu.getInput("Enter name of supplier to edit:") 

    let supplier = this.supplierManager.getSupplier(name)

    // confirm exists already and handle if not
    // this.menu.outputMessage(`${itemName} not found in inventory`)

    if (!supplier) { return } // causing it to go back to the menu if no supplier entered - handle properly

    //output current details

    const supplierDetails: SupplierDetails = await this.getSupplierInput( "Please enter new details for supplier (enter to leave unchanged)", {
      name: supplier.getName(),
      email: supplier.getEmail(), 
      phoneNumber:supplier.getPhoneNumber(),
      deliveryTimeInDays: supplier.getDaysToDeliver()
    })

    this.supplierManager.editSupplier(supplier, supplierDetails)
  }

  deleteAction =  async () => {
    const name = await this.menu.getInput("Enter name of supplier to delete:") 
    let supplier = this.supplierManager.getSupplier(name)

    // confirm exists already and handle if not
    // this.menu.outputMessage(`${name} not found in supplier directory`)

    if (!supplier) { return } // causing it to go back to the menu if no supplier enterered

    this.supplierManager.removeSupplier(name)
  }

  viewAction =  async () => {

  //   console.log("view action ", this.supplierManager.getAllSuppliers())

  //       for (const [key,value] of this.supplierManager.getAllSuppliers().entries()) {
  //           console.log(key, value)
  //         };

  // this.menu.drawTable()

  }

  orderHistoryAction = () => {
    let orders = this.supplierManager.viewOrders()
    let orderSummaries: Array<Array<string>> = [["Order Number", "Supplier Name", "Order Status"]]

    orders.forEach(order => {
      const orderNumber = order.getOrderNumber()
      if (!orderNumber) {return}
      orderSummaries.push([orderNumber.toString(), "supplier name", "order status" ])
    });
    this.menu.drawTable(orderSummaries)
  }
}