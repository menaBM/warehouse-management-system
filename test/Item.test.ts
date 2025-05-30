import Item from "../src/model/Item";

describe('Item', () => {
    let item: Item;
    
    beforeEach(() => {
        item = new Item('test name', 100, 50, 200, 10, "supplier")
    })

    it('Gets item name', () => {
       let name = item.getName()
       expect(name).toEqual('test name')
    });

    it('Gets item price', () => {
       let price = item.getPrice()
       expect(price).toEqual(100)
    });

    it('Gets supplier price', () => {
       let price = item.getSupplierPrice()
       expect(price).toEqual(50)
    });

    it('Updates item quantity', () => {
        item.setQuantity(15)
        let newNumber = item.getQuantity()
        expect(newNumber).toEqual(15)
    })

    it('Gets item quantity', () => {
       let quantity = item.getQuantity()
       expect(quantity).toEqual(200)
    });

    it('Updates supplier name', () => {
        item.setSupplierName('new supplier')
        let newName = item.getSupplierName()
        expect(newName).toEqual('new supplier')
    })

    it('Gets supplier name', () => {
       let name = item.getSupplierName()
       expect(name).toEqual('supplier')
    });

    it('Checks if the item is low stock', () => {
        expect(item.isLowStock()).toBeFalsy()
        item.setQuantity(1)
        expect(item.isLowStock()).toBeTruthy()
    })
});