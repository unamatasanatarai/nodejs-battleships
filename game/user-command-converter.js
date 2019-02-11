class UserCommandConverter {
  constructor() {
    this.coordinates = [0, 0];
    this.validShot = /^[a-z][0-9]+/g;
    this.regexString = /[a-z]/g;
    this.regexNumber = /[0-9]+/g;
  }

  validateInput(string) {
    let r = string.match(this.validShot);

    if (r === null) {
      throw Error("Illegal coordinates");
    }
    return true;
  }

  toX(string) {
    return string.match(this.regexString)[0].charCodeAt() - 97;
  }

  toY(string) {
    return 1 * string.match(this.regexNumber)[0] - 1;
  }

  toCoordinates(string) {
    string = string.toLowerCase().trim();
    this.validateInput(string);

    return { x: this.toX(string), y: this.toY(string) };
  }
}

module.exports = UserCommandConverter;
