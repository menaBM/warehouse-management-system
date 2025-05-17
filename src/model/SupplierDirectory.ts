import { SupplierDetails } from "../types"
import { Supplier } from "./Supplier"

export class SupplierDirectory {
    suppliers: Map<string, Supplier> = new Map()

    constructor() {
        
    }

    addSupplier (supplier: Supplier ) {
        // verify not already there

        this.suppliers.set(supplier.name, supplier)
    }

    getSupplier (supplierName: string) {
        return this.suppliers.get(supplierName)
    }

    editSupplier (supplier: Supplier, supplierDetails: SupplierDetails) {
        if (supplier.name !== supplierDetails.name) {
            this.suppliers.delete(supplier.name)
        }
      
        supplier.setName(supplierDetails.name)
        supplier.setEmail(supplierDetails.email)
        supplier.setPhoneNumber(supplierDetails.phoneNumber)
        supplier.setDaysToDeliver(supplierDetails.deliveryTimeInDays)
      
        this.suppliers.set(supplier.name, supplier)
    }

    removeSupplier (supplierName: string) {
        this.suppliers.delete(supplierName)
    }

    getAllSuppliers (): Map<string, Supplier> {
        return this.suppliers;
    }
}