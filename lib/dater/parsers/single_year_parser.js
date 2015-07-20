var chrono = require('chrono-node');
var parser = new chrono.Parser();
// Provide search pattern
parser.pattern = function () { return /(\d{4})/i }
parser.extract = function(text, ref, match, opt) {
  var result = new chrono.ParsedResult({
    ref: ref,
    text: match[0],
    index: match.index,
    start: {
      year: match[1]
    }
  });
  return result;
}

module.exports = parser;