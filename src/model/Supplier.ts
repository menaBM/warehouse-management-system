export class Supplier {
  private name: string;
  private email: string;
  private phoneNumber: number;

  constructor(name: string, email: string, phoneNumber: number) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  setPhoneNumber(phoneNumber: number): void {
    this.phoneNumber = phoneNumber;
  }

  getPhoneNumber(): number {
    return this.phoneNumber;
  }
}
