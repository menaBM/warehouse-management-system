import { SupplierOrder } from "../src/model/order/SupplierOrder";
import { PurchaseOrderArchive } from "../src/model/PurchaseOrderArchive";
import { OrderStatus } from "../src/types";

jest.mock("../src/model/order/Order");

describe("Purchase Order Archive", () => {
  let order1 = new SupplierOrder();
  let order2 = new SupplierOrder();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Maintains order history", () => {
    let purchaseOrderArchive = new PurchaseOrderArchive();
    purchaseOrderArchive.addOrder(order1);
    purchaseOrderArchive.addOrder(order2);
    expect(purchaseOrderArchive.getOrder(1)).toEqual(order1);
    expect(purchaseOrderArchive.getOrder(2)).toEqual(order2);
  });

  it("Gets all orders from history", () => {
    let purchaseOrderArchive = new PurchaseOrderArchive();
    purchaseOrderArchive.addOrder(order1);
    purchaseOrderArchive.addOrder(order2);
    expect(purchaseOrderArchive.getAllOrders()).toEqual(
      new Map([
        [1, order1],
        [2, order2],
      ]),
    );
  });

  it("Gets orders with non-delivered status", () => {
    let purchaseOrderArchive = new PurchaseOrderArchive();
    jest.mocked(order1.getStatus).mockReturnValueOnce(OrderStatus.Delivered);
    jest.mocked(order2.getStatus).mockReturnValueOnce(OrderStatus.Processing);
    purchaseOrderArchive.addOrder(order1);
    purchaseOrderArchive.addOrder(order2);
    expect(purchaseOrderArchive.getUndeliveredOrders()).toContain(2);
  });
});
