import { Inventory } from "../src/model/Inventory";
import Item from "../src/model/Item";

jest.mock("../src/model/Item")

describe('Inventory', () => {
    let inventory: Inventory;
    let item1 = new Item("first item", 4, 3, 2, 1, "supplier")
    let item2 = new Item("second item", 5, 2, 10, 15, "supplier")

    beforeEach(() => {
        inventory = new Inventory
        jest.resetAllMocks()
        jest.mocked(item1.getName).mockReturnValue("first item")
        jest.mocked(item2.getName).mockReturnValue("second item")
    })

    it('Creates a new item', () => {
       inventory.newItem("name", 1, 2, 3, 4, "supplier")
       expect(inventory.getItems().keys()).toContain("name")
    });

    it('Adds an item object', () => {
       inventory.addItem(item1)
       expect(item1.getName).toHaveBeenCalled()
       expect(inventory.lookupItem("first item")).toEqual(item1)
    });

    it('Returns undefined when item lookup fails', () => {
       expect(inventory.lookupItem("first item")).toEqual(undefined)
    });

    it('Gets all items', () => {
       inventory.addItem(item1)
       inventory.addItem(item2)
       expect(inventory.getItems().get("first item")).toEqual(item1)
       expect(inventory.getItems().get("second item")).toEqual(item2)
       expect(inventory.getItems().size).toBe(2)
    });

    it('Reports current stock', () => {
        jest.mocked(item1.isLowStock).mockReturnValue(false)
        jest.mocked(item2.isLowStock).mockReturnValue(true)
        jest.mocked(item1.getQuantity).mockReturnValue(2)
        jest.mocked(item2.getQuantity).mockReturnValue(10)
        inventory.addItem(item1)
        inventory.addItem(item2)

       let expected = [
            ["Item", "Quantity", "Low Stock"],
            ["first item", "2", "No"],
            ["second item", "10", "Yes"]
        ]
        expect(inventory.generateReport()).toEqual(expected)
    });


    it('Reports low stock items', () => {
        jest.mocked(item1.isLowStock).mockReturnValue(false)
        jest.mocked(item2.isLowStock).mockReturnValue(true)
        jest.mocked(item1.getQuantity).mockReturnValue(2)
        jest.mocked(item2.getQuantity).mockReturnValue(10)
        inventory.addItem(item1)
        inventory.addItem(item2)

        let expected = [
            ["Item", "Quantity"],
            ["second item", "10"]
        ]
        expect(inventory.getLowStock()).toEqual(expected)
    });

    it('Updates stock quantities', () => {
        inventory.addItem(item1)
        inventory.addItem(item2)
        jest.mocked(item1.getQuantity).mockReturnValueOnce(2)
        jest.mocked(item2.getQuantity).mockReturnValueOnce(10)
        const items = new Map([[item1, 1], [item2, 5]])
        inventory.updateStock(items)
        expect(item1.setQuantity).toHaveBeenCalledWith(1)
        expect(item2.setQuantity).toHaveBeenCalledWith(5)

        jest.mocked(item1.getQuantity).mockReturnValueOnce(1)
        jest.mocked(item2.getQuantity).mockReturnValueOnce(5)
        const items2 = new Map([[item1, -3], [item2, -1]])
        inventory.updateStock(items2)
        expect(item1.setQuantity).toHaveBeenCalledWith(4)
        expect(item2.setQuantity).toHaveBeenCalledWith(6)

    });

    it('Sends alerts about items that are low stock', () => {
        jest.mocked(item1.isLowStock).mockReturnValue(false)
        jest.mocked(item2.isLowStock).mockReturnValue(true)
        jest.mocked(item2.getQuantity).mockReturnValue(10)
        inventory.addItem(item1)
        inventory.addItem(item2)
        const items = new Map([[item1, 1], [item2, 1]])
        const alerts = inventory.updateStock(items)
        expect(alerts).toEqual(["LOW STOCK: Current quantity of second item is 10"])
        expect(alerts.length).toBe(1)
    });
});