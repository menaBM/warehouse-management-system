import { SupplierOrder } from "./order/SupplierOrder"

export class OrderArchive {
    private static nextOrderNumber: number = 1
    private orders: Map<number, SupplierOrder> = new Map()

    addOrder (order: SupplierOrder) {
        const orderNumber = OrderArchive.nextOrderNumber
        this.orders.set(orderNumber, order)
        order.setOrderNumber(orderNumber)
        OrderArchive.nextOrderNumber++
        return orderNumber
    }

    getOrder (orderNumber: number): SupplierOrder | undefined {
        return this.orders.get(orderNumber)
    }

    getAllOrders (): Map<number, SupplierOrder> {
        return this.orders
    }
}