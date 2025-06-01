import { Item } from "../../src/model/Item";
import { OrderStatus } from "../../src/types";
import { Inventory } from "../../src/model/Inventory";
import { FinancialReport } from "../../src/model/FinancialReport";
import { CustomerOrder } from "../../src/model/order/CustomerOrder";

jest.mock("../../src/model/Item");
jest.mock("../../src/model/FinancialReport");

describe("SupplierOrder", () => {
  let order: CustomerOrder;
  let item1 = new Item("first item", 4, 3, 2, 1, "supplier");
  let item2 = new Item("second item", 5, 2, 10, 15, "supplier");
  jest.mocked(item1.getName).mockReturnValue("first item");
  jest.mocked(item2.getName).mockReturnValue("second item");

  beforeEach(() => {
    jest.resetAllMocks();
    order = new CustomerOrder();
  });

  it("Completes the order", () => {
    order.setItem(item1, 10);
    order.setItem(item2, 10);

    order.complete(new Inventory(), new FinancialReport());
    expect(order.getStatus()).toEqual(OrderStatus.Dispatched);
    expect(FinancialReport.prototype.updateSalesRevenue).toHaveBeenCalledWith(
      order,
    );
  });
});
