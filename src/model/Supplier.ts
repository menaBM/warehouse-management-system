export class Supplier {
    private name: string;
    private email: string;
    private phoneNumber: number;
  
    constructor(name: string, email: string, phoneNumber: number) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
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
}