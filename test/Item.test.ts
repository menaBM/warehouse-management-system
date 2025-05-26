import Item from "../src/model/Item";

describe('Item', () => {

    let item: Item;
    
    beforeEach(() => {
        item = new Item('test name', 100, 200, 10)
    })

    it('Gets item name', () => {
       let name = item.getName()
       expect(name).toEqual('test name')
    });

    // it('Can update item name', () => {
    //     item.setName('new name')
    //     let newName = item.getName()
    //     expect(newName).toEqual('new name')
    // })

    it('Gets item price', () => {
       let price = item.getPrice()
       expect(price).toEqual(100)
    });

    // it('Can update item email', () => {
    //     item.setEmail('new@email')
    //     let newEmail = item.getEmail()
    //     expect(newEmail).toEqual('new@email')
    // })

    it('Gets item quantity', () => {
       let quantity = item.getQuantity()
       expect(quantity).toEqual(200)
    });

    it('Updates item quantity', () => {
        item.setQuantity(15)
        let newNumber = item.getQuantity()
        expect(newNumber).toEqual(15)
    })

    it('Checks if the item is low stock', () => {
        expect(item.isLowStock()).toBeFalsy()
        item.setQuantity(1)
        expect(item.isLowStock()).toBeTruthy()
    })

    it('Sets a default low stock threshold', () => {
       let newItem = new Item('test name', 100, 200);
       newItem.setQuantity(40)
       expect(newItem.isLowStock()).toBeTruthy()
    });
});