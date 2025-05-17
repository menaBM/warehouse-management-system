"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
class Supplier {
    constructor(name, email, phoneNumber, daysToDeliver) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.daysToDeliver = daysToDeliver;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setDaysToDeliver(daysToDeliver) {
        this.daysToDeliver = daysToDeliver;
    }
    getDaysToDeliver() {
        return this.daysToDeliver;
    }
}
exports.Supplier = Supplier;
