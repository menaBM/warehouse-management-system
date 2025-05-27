import { SupplierDetails } from "../types"
import { SupplierOrder } from "./order/SupplierOrder"
import { PurchaseOrderArchive } from "./PurchaseOrderArchive"
import { Supplier } from "./Supplier"

export class SupplierManager {
    private suppliers: Map<string, Supplier> = new Map()
    private purchaseOrderArchive: PurchaseOrderArchive = new PurchaseOrderArchive()

    createSupplier (supplierDetails: SupplierDetails) {
        let supplier = new Supplier (supplierDetails.name, supplierDetails.email, supplierDetails.phoneNumber, supplierDetails.deliveryTimeInDays)
        this.suppliers.set(supplierDetails.name, supplier)
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

    removeSupplier (supplier: Supplier) {
        this.suppliers.delete(supplier.getName())
    }

    getAllSuppliers (): Array<Array<string>> {
        let suppliers = new Array<Array<string>>
        this.suppliers.forEach(supplier => {
            suppliers.push([
                supplier.getName(),
                supplier.getEmail(),
                supplier.getPhoneNumber().toString(),
                supplier.getDaysToDeliver().toString()])
        })
        return suppliers;
    }

    addSupplierOrder (order: SupplierOrder) {
        const orderNumber = this.purchaseOrderArchive.addOrder(order)
    }

    viewOrders (): Map<number, SupplierOrder> { // rename get all orders
        return this.purchaseOrderArchive.getAllOrders()
    }
}