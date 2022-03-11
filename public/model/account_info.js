export class AccountInfo {
  constructor(data) {
    this.name = data.name;
    this.address = datta.address;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.creditNo = data.creditNo;
    this.photoURL = data.photoURL;
  }
  serialize() {
    return {
      name: this.name,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      creditNo: this.creditNo,
      photoURL: this.photoURL,
    }
  }

  static instance() {
    return new AccountInfo({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      creditNo: '',
      photoURL: `<ion-icon name="cart"></ion-icon>`,
    });
  }
}