import { Supplier } from "../src/model/Supplier";

describe('Supplier', () => {

    let supplier: Supplier;
    
    beforeEach(() => {
        supplier = new Supplier('test name', 'test@email', 1)
    })

    it('Gets supplier name', () => {
       let name = supplier.getName()
       expect(name).toEqual('test name')
    });

    it('Updates supplier name', () => {
        supplier.setName('new name')
        let newName = supplier.getName()
        expect(newName).toEqual('new name')
    })

    it('Gets supplier email', () => {
       let email = supplier.getEmail()
       expect(email).toEqual('test@email')
    });

    it('Updates supplier email', () => {
        supplier.setEmail('new@email')
        let newEmail = supplier.getEmail()
        expect(newEmail).toEqual('new@email')
    })

    it('Gets supplier phone number', () => {
       let phoneNumber = supplier.getPhoneNumber()
       expect(phoneNumber).toEqual(1)
    });

    it('Updates supplier phone number', () => {
        supplier.setPhoneNumber(123456)
        let newNumber = supplier.getPhoneNumber()
        expect(newNumber).toEqual(123456)
    })
});