export class Supplier {
    name: string;
    email: string;
    phoneNumber: number;
    daysToDeliver: number;

    constructor(name: string, email: string, phoneNumber: number, daysToDeliver: number) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.daysToDeliver = daysToDeliver;
    }

    setName (name: string) {
        this.name = name
    }

    getName (): string {
        return this.name
    }

    setEmail (email: string) {
        this.email = email;
    }

    getEmail (): string {
        return this.email
    }

    setPhoneNumber (phoneNumber: number) {
        this.phoneNumber = phoneNumber;
    }

    getPhoneNumber (): number {
        return this.phoneNumber;
    }

    setDaysToDeliver (daysToDeliver: number) {
        this.daysToDeliver = daysToDeliver
    }

    getDaysToDeliver (): number {
        return this.daysToDeliver;
    }
}