function Convert() {
  this.coordinates = [0, 0];
  this.validShot = /^[a-z][0-9]+/g;
  this.regexString = /[a-z]/g;
  this.regexNumber = /[0-9]+/g;
}

Convert.prototype.validateInput = function(string) {
  let r = string.match(this.validShot);

  if (r === null) {
    throw Error("Illegal coordinates");
  }
  return true;
};

Convert.prototype.toX = function(string) {
  return string.match(this.regexString)[0].charCodeAt() - 97;
};

Convert.prototype.toY = function(string) {
  return 1 * string.match(this.regexNumber)[0] - 1;
};

Convert.prototype.toCoordinates = function(string) {
  string = string.toLowerCase().trim();
  this.validateInput(string);

  return { x: this.toX(string), y: this.toY(string) };
};

module.exports = Convert;
