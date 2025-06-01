import { Item } from "../../src/model/Item";
import { OrderStatus } from "../../src/types";
import { Inventory } from "../../src/model/Inventory";
import { FinancialReport } from "../../src/model/FinancialReport";
import { SupplierOrder } from "../../src/model/order/SupplierOrder";

jest.mock("../../src/model/Item");
jest.mock("../../src/model/FinancialReport");

describe("SupplierOrder", () => {
  let order: SupplierOrder;
  let item1 = new Item("first item", 4, 3, 2, 1, "supplier");
  jest.mocked(item1.getName).mockReturnValue("first item");

  beforeEach(() => {
    jest.resetAllMocks();
    order = new SupplierOrder();
  });

  it("Gets supplier name", () => {
    jest.mocked(item1.getSupplierName).mockReturnValue("name");
    order.setItem(item1, 10);
    order.complete(new Inventory(), new FinancialReport());
    expect(order.getSupplierName()).toEqual("name");
  });

  it("Handles no supplier name set", () => {
    expect(order.getSupplierName()).toEqual("");
  });

  it("Completes the order", () => {
    jest.mocked(item1.getSupplierName).mockReturnValue("name");
    order.setItem(item1, 10);
    order.complete(new Inventory(), new FinancialReport());
    expect(order.getStatus()).toEqual(OrderStatus.Processed);
    expect(order.getSupplierName()).toEqual("name");
    expect(FinancialReport.prototype.updatePurchaseCosts).toHaveBeenCalledWith(
      order,
    );
  });

  it("Does not limit the item quantity", () => {
    jest.mocked(item1.getQuantity).mockReturnValue(5);
    expect(order.isValidQuantity(item1, 100)).toBeTruthy();
  });

  it("Gets the supplier price for the item", () => {
    order.setItem(item1, 5);
    expect(item1.getSupplierPrice).toHaveBeenCalled();
  });
});
