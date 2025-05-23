import { SupplierDetails } from "../types"
import { Supplier } from "./Supplier"

export class SupplierDirectory {
    private suppliers: Map<string, Supplier> = new Map()

    constructor() {
        
    }

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
}