export class Item {
  constructor(roll, contact, itemName, location, fkey1, fvalue1, fkey2, fvalue2, fkey3, fvalue3) {
    this.roll = roll;
    this.contact = contact;
    this.itemName = itemName;
    this.location = location;
    this.fkey1 = fkey1;
    this.fvalue1 = fvalue1;
    this.fkey2 = fkey2;
    this.fvalue2 = fvalue2;
    this.fkey3 = fkey3;
    this.fvalue3 = fvalue3;
  }
}

export class User {
  constructor(roll, password) {
    this.roll = roll;
    this.password = password;
  }
}
