import { SupplierDetails } from "../types"
import { SupplierOrder } from "./order/SupplierOrder"
import { PurchaseOrderArchive } from "./PurchaseOrderArchive"
import { Supplier } from "./Supplier"

export class SupplierManager {
    private suppliers: Map<string, Supplier> = new Map()
    private purchaseOrderArchive: PurchaseOrderArchive = new PurchaseOrderArchive()

    addSupplier (supplier: Supplier ) {
        // verify not already there

        this.suppliers.set(supplier.getName(), supplier)
    }

    getSupplier (supplierName: string) {
        return this.suppliers.get(supplierName)
    }

    editSupplier (supplier: Supplier, supplierDetails: SupplierDetails) {
        if (supplier.getName() !== supplierDetails.name) {
            this.suppliers.delete(supplier.getName())
        }
      
        supplier.setName(supplierDetails.name)
        supplier.setEmail(supplierDetails.email)
        supplier.setPhoneNumber(supplierDetails.phoneNumber)
        supplier.setDaysToDeliver(supplierDetails.deliveryTimeInDays)
      
        this.suppliers.set(supplier.getName(), supplier)
    }

    removeSupplier (supplierName: string) {
        this.suppliers.delete(supplierName)
    }

    getAllSuppliers (): Map<string, Supplier> {
        return this.suppliers;
    }

    addSupplierOrder (order: SupplierOrder) {
        const orderNumber = this.purchaseOrderArchive.addOrder(order)
    }

    viewOrders (): Map<number, SupplierOrder> { // rename get all orders
        return this.purchaseOrderArchive.getAllOrders()
    }
}