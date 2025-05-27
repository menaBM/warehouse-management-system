export type SupplierDetails = {name: string, email: string, phoneNumber: number, deliveryTimeInDays: number}

export enum OrderStatus {
    Processing = "Processing",
    Processed = "Processed",
    Dispatched = "Dispatched",
    Delivered = "Delivered"
}