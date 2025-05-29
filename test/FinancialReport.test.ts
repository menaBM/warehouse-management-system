import { FinancialReport } from "../src/model/FinancialReport";
import Item from "../src/model/Item";
import { Order } from "../src/model/order/Order";

jest.mock("../src/model/Item")
jest.mock("../src/model/order/Order")

describe('Financial Report', () => {
    let report: FinancialReport;
    let order1 = new Order()
    let order2= new Order()
    let item1 = new Item("first item", 1, 2, 3)
    let item2 = new Item("second item", 2, 10, 15)

    jest.mocked(item1.getName).mockReturnValue('first item')
    jest.mocked(item2.getName).mockReturnValue('second item')

    jest.mocked(item1.getPrice).mockReturnValue(1)
    jest.mocked(item2.getPrice).mockReturnValue(2)
    
    beforeEach(() => {
        jest.clearAllMocks();
        report = new FinancialReport();
    })

    it('Tracks total sales revenue', () => {
        jest.mocked(order1.getAllItems).mockReturnValueOnce(new Map<Item, number>)
        jest.mocked(order1.getTotal).mockReturnValueOnce(10)
        jest.mocked(order2.getAllItems).mockReturnValueOnce(new Map<Item, number>)
        jest.mocked(order2.getTotal).mockReturnValueOnce(55)
        report.updateSalesRevenue(order1)
        expect(report.generateSummaryReport()[1][1]).toEqual("£10")
        report.updateSalesRevenue(order2)
        expect(report.generateSummaryReport()[1][1]).toEqual("£65")
    });

    it('Tracks sales revenue of each item', () => {
        let items = new Map([[item1, 5], [item2, 3]])
        jest.mocked(order1.getAllItems).mockReturnValueOnce(items)
        report.updateSalesRevenue(order1)
        expect(report.generateFullReport().find(row => row.includes("first item"))).toEqual(["first item", "£5"])
        expect(report.generateFullReport().find(row => row.includes("second item"))).toEqual(["second item", "£6"])

        let items2 = new Map([[item1, 1], [item2, 5]])
        jest.mocked(order2.getAllItems).mockReturnValueOnce(items2)
        report.updateSalesRevenue(order2)
        expect(report.generateFullReport().find(row => row.includes("first item"))).toEqual(["first item", "£6"])
        expect(report.generateFullReport().find(row => row.includes("second item"))).toEqual(["second item", "£16"])
    })

    it('Tracks total purchase costs', () => {
        jest.mocked(order1.getAllItems).mockReturnValueOnce(new Map<Item, number>)
        jest.mocked(order1.getTotal).mockReturnValueOnce(123)
        jest.mocked(order2.getAllItems).mockReturnValueOnce(new Map<Item, number>)
        jest.mocked(order2.getTotal).mockReturnValueOnce(11)
        report.updatePurchaseCosts(order1)
        expect(report.generateSummaryReport()[1][0]).toEqual("£123")
        report.updatePurchaseCosts(order2)
        expect(report.generateSummaryReport()[1][0]).toEqual("£134")
    });

    it('Tracks purchase costs of each item', () => {
        let items = new Map([[item1, 3], [item2, 9]])
        jest.mocked(order1.getAllItems).mockReturnValueOnce(items)
        report.updatePurchaseCosts(order1)
        expect(report.generateFullReport().find(row => row.includes("first item"))).toEqual(["first item", "£3"])
        expect(report.generateFullReport().find(row => row.includes("second item"))).toEqual(["second item", "£18"])

        let items2 = new Map([[item1, 6], [item2, 3]])
        jest.mocked(order2.getAllItems).mockReturnValueOnce(items2)
        report.updatePurchaseCosts(order2)
        expect(report.generateFullReport().find(row => row.includes("first item"))).toEqual(["first item", "£9"])
        expect(report.generateFullReport().find(row => row.includes("second item"))).toEqual(["second item", "£24"])
    })

    it('Generates a summary report', () => {
        jest.mocked(order1.getAllItems).mockReturnValueOnce(new Map<Item, number>)
        jest.mocked(order1.getTotal).mockReturnValueOnce(15)
        
        jest.mocked(order2.getAllItems).mockReturnValueOnce(new Map<Item, number>)
        jest.mocked(order2.getTotal).mockReturnValueOnce(45)

        report.updatePurchaseCosts(order1)
        report.updateSalesRevenue(order2)

        expect(report.generateSummaryReport()[1]).toEqual(["£15","£45", "£30"])
    });

    it('Generates a full report', () => {
        let items = new Map([[item1, 3], [item2, 9]])
        jest.mocked(order1.getAllItems).mockReturnValueOnce(items)
        jest.mocked(order1.getTotal).mockReturnValueOnce(21)
        
        let items2 = new Map([[item1, 6], [item2, 3]])
        jest.mocked(order2.getAllItems).mockReturnValueOnce(items2)
        jest.mocked(order2.getTotal).mockReturnValueOnce(12)

        report.updatePurchaseCosts(order1)
        report.updateSalesRevenue(order2)

        let expected = [
            ["Expenses"],
            ["first item", "£3"],
            ["second item", "£18"],
            ["Stock Purchase Costs", "£21"],
            ["Revenue"],
            ["first item", "£6"],
            ["second item", "£6"],
            ["Sales Revenue", "£12"],
            ["Net income (Loss)", "£9"]
        ]
        expect(report.generateFullReport()).toEqual(expected)
    });
});