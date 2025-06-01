import { Item } from "../../src/model/Item";
import { OrderStatus } from "../../src/types";
import { Order } from "../../src/model/order/Order";
import { Inventory } from "../../src/model/Inventory";
import { FinancialReport } from "../../src/model/FinancialReport";

jest.mock("../../src/model/Item");

describe("Order", () => {
  let order: Order;
  let item1 = new Item("first item", 4, 3, 2, 1, "supplier");
  let item2 = new Item("second item", 5, 2, 10, 15, "supplier");
  jest.mocked(item1.getName).mockReturnValue("first item");
  jest.mocked(item2.getName).mockReturnValue("second item");

  beforeEach(() => {
    jest.resetAllMocks();
    order = new Order();
  });

  it("Gets all items", () => {
    order.setItem(item1, 5);
    order.setItem(item2, 3);
    const items = order.getAllItems();
    expect(items.size).toEqual(2);
    expect(items).toEqual(
      new Map([
        [item1, 5],
        [item2, 3],
      ]),
    );
  });

  it("Sets order status", () => {
    order.setStatus(OrderStatus.Delivered);
    expect(order.getStatus()).toEqual(OrderStatus.Delivered);
  });

  it("Gets order status", () => {
    expect(order.getStatus()).toEqual(OrderStatus.Processing);
  });

  it("Adds a new item to the order", () => {
    order.setItem(item1, 5);
    order.setItem(item2, 3);
    const items = order.getAllItems();
    expect(items.size).toEqual(2);
    expect(items.get(item1)).toEqual(5);
    expect(items.get(item2)).toEqual(3);
  });

  it("Updates an existing an item quantity", () => {
    order.setItem(item1, 5);
    order.setItem(item1, 3);
    const items = order.getAllItems();
    expect(items.size).toEqual(1);
    expect(items.get(item1)).toEqual(3);
  });

  it("Adds the price of the new item to the total ", () => {
    jest.mocked(item1.getPrice).mockReturnValue(4);
    order.setItem(item1, 5);
    expect(order.getTotal()).toEqual(20);
  });

  it("Updates the total when an item is edited", () => {
    jest.mocked(item1.getPrice).mockReturnValue(4);
    order.setItem(item1, 5);
    expect(order.getTotal()).toEqual(20);
    order.setItem(item1, 3);
    expect(order.getTotal()).toEqual(12);
  });

  it("Checks if an item is part of the order", () => {
    order.setItem(item1, 5);
    expect(order.hasItem(item1)).toBeTruthy();
    expect(order.hasItem(item2)).toBeFalsy();
  });

  it("Removes an item from the order", () => {
    order.setItem(item1, 5);
    expect(order.hasItem(item1)).toBeTruthy();
    order.removeItem(item1);
    expect(order.hasItem(item1)).toBeFalsy();
    expect(order.getAllItems().size).toEqual(0);
  });

  it("Updates the total when an item is removed", () => {
    jest.mocked(item1.getPrice).mockReturnValue(4);
    order.setItem(item1, 5);
    expect(order.getTotal()).toEqual(20);
    order.removeItem(item1);
    expect(order.getTotal()).toEqual(0);
  });

  it("Gets the item price", () => {
    jest.mocked(item1.getPrice).mockReturnValue(4);
    order.setItem(item1, 5);
    order.removeItem(item1);
    expect(item1.getPrice).toHaveBeenCalled();
  });

  it("Gets the order total", () => {
    jest.mocked(item1.getPrice).mockReturnValue(4);
    expect(order.getTotal()).toEqual(0);
    order.setItem(item1, 5);
    expect(order.getTotal()).toEqual(20);
  });

  it("Summarises the order", () => {
    jest.mocked(item1.getPrice).mockReturnValue(4);
    jest.mocked(item2.getPrice).mockReturnValue(5);
    jest.mocked(item1.getName).mockReturnValue("first item");
    jest.mocked(item2.getName).mockReturnValue("second item");
    order.setItem(item1, 5);

    order.setItem(item2, 3);

    expect(order.getSummary()).toEqual([
      ["Name", "Quantity", "Price"],
      ["first item", "5", "20"],
      ["second item", "3", "15"],
    ]);
  });

  it("Summarises order when empty", () => {
    expect(order.getSummary()).toEqual([["Name", "Quantity", "Price"]]);
  });

  it("Completes the order", () => {
    order.complete(new Inventory(), new FinancialReport());
    expect(order.getStatus()).toEqual(OrderStatus.Processed);
  });

  it("Checks there is sufficient quantity of the item to add to order", () => {
    jest.mocked(item1.getQuantity).mockReturnValue(5);
    expect(order.isValidQuantity(item1, 1)).toBeTruthy();
    expect(order.isValidQuantity(item1, 10)).toBeFalsy();
  });
});
