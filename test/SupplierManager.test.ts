import { Supplier } from "../src/model/Supplier";
import { SupplierManager } from "../src/model/SupplierManager";
import { OrderStatus, SupplierDetails } from "../src/types";
import { PurchaseOrderArchive } from "../src/model/PurchaseOrderArchive";
import { SupplierOrder } from "../src/model/order/SupplierOrder";
import { Item } from "../src/model/Item";

jest.mock("../src/model/Supplier");
jest.mock("../src/model/PurchaseOrderArchive")
jest.mock("../src/model/order/SupplierOrder")
jest.mock("../src/model/Item")

describe('Supplier manager', () => {

  let supplier = new Supplier("test name", "test@email", 123);

  const supplierDetails: SupplierDetails = {
    name:"test name",
    email: "test@email", 
    phoneNumber: 123,
  }
    
    
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it(('Creates new supplier'), () => {
    let supplierManager = new SupplierManager()
    supplierManager.createSupplier(supplierDetails)
    expect(Supplier).toHaveBeenCalledTimes(1)
    expect(supplierManager.getSupplier("test name")).toBeInstanceOf(Supplier)
  })

  it(('Gets supplier by name'), () => {
    let supplierManager = new SupplierManager()
    supplierManager.createSupplier(supplierDetails)
    expect(supplierManager.getSupplier("test name")).toBeInstanceOf(Supplier)
  })

  it(('Edits a supplier'), () => {
    jest.mocked(supplier.getName).mockReturnValue("test name");
    let supplierManager = new SupplierManager()
    const details: SupplierDetails = {
      name:"test name",
      email: "new@email", 
      phoneNumber: 456,
    }

    supplierManager.createSupplier(supplierDetails)
    supplierManager.editSupplier(supplier, details)
    expect(supplier.setName).toHaveBeenCalledWith("test name")
    expect(supplier.setEmail).toHaveBeenCalledWith("new@email")
    expect(supplier.setPhoneNumber).toHaveBeenCalledWith(456)
    expect(supplierManager.getSupplier("test name")).toBeInstanceOf(Supplier)  
})

  it(('Removes old supplier records if necessary when editing'), () => {
    jest.mocked(supplier.getName).mockReturnValue("test name");
    let supplierManager = new SupplierManager()
    const details: SupplierDetails = {
      name:"new name",
      email: "new@email", 
      phoneNumber: 456,
    }

    supplierManager.createSupplier(supplierDetails)
    supplierManager.editSupplier(supplier, details)
    expect(supplier.setName).toHaveBeenCalledWith("new name")
    expect(supplier.setEmail).toHaveBeenCalledWith("new@email")
    expect(supplier.setPhoneNumber).toHaveBeenCalledWith(456)
    expect(supplierManager.getSupplier("test name")).toBeUndefined() 
    expect(supplierManager.getSupplier("new name")).toBeInstanceOf(Supplier)  
  })


  it(('Deletes a supplier'), () => {
    jest.mocked(supplier.getName).mockReturnValue("test name");
    let supplierManager = new SupplierManager()

    supplierManager.createSupplier(supplierDetails)
    expect(supplierManager.getSupplier("test name")).toBeInstanceOf(Supplier)  
    supplierManager.removeSupplier(supplier)
    expect(supplierManager.getSupplier("test name")).toBeUndefined() 
  })

  it(('Gets all suppliers'), () => {
    jest.mocked(Supplier.prototype.getName).mockReturnValueOnce("test name");
    jest.mocked(Supplier.prototype.getEmail).mockReturnValueOnce("test@email");
    jest.mocked(Supplier.prototype.getPhoneNumber).mockReturnValueOnce(123);

    jest.mocked(Supplier.prototype.getName).mockReturnValueOnce("new name");
    jest.mocked(Supplier.prototype.getEmail).mockReturnValueOnce("new@email");
    jest.mocked(Supplier.prototype.getPhoneNumber).mockReturnValueOnce(456);

    const details: SupplierDetails = {
      name:"new name",
      email: "new@email", 
      phoneNumber: 456,
    }

    let supplierManager = new SupplierManager()
    supplierManager.createSupplier(supplierDetails)
    supplierManager.createSupplier(details)

    expect(supplierManager.getAllSuppliers()).toEqual([['test name', "test@email", "123"], ["new name", "new@email", "456"]])  
  })

  it(('Adds a supplier order'), () => {
    let order = new SupplierOrder()
    let supplierManager = new SupplierManager()
    supplierManager.addSupplierOrder(order)

    expect(PurchaseOrderArchive.prototype.addOrder).toHaveBeenCalledWith(order)  
  })

  it(('Views a supplier order'), () => {
    let supplierManager = new SupplierManager()
    supplierManager.viewOrders()

    expect(PurchaseOrderArchive.prototype.getAllOrders).toHaveBeenCalled()
  })

  it(('Processes a supplier delivery'), () => {
    let order = new SupplierOrder
    let item1 = new Item("item 1", 1, 2, 3, 4, "5")
    const item2 = new Item("item 2", 1, 2, 3, 4, "5")
    jest.mocked(order.getAllItems).mockReturnValueOnce(new Map([[item1, 5], [item2, 3]]));
    jest.mocked(PurchaseOrderArchive.prototype.getOrder).mockReturnValueOnce(order);

    let supplierManager = new SupplierManager()
    const result = supplierManager.processDelivery(1)

    expect(order.setStatus).toHaveBeenCalledWith(OrderStatus.Delivered)
    expect(result).toEqual(new Map([[item1, -5], [item2, -3]]))
  })

  it(('Gets pending deliveries'), () => {
    let supplierManager = new SupplierManager()
    supplierManager.getPendingDeliveries()

    expect(PurchaseOrderArchive.prototype.getUndeliveredOrders).toHaveBeenCalled()
  })
});