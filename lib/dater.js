var chrono = require('chrono-node')
var appRoot = require('app-root-path');



// e.g. (1995-1999) OR [1995 - 1999]
function _year_range_parser() {
  var yearRangeParser = new chrono.Parser();
  // Provide search pattern
  yearRangeParser.pattern = function () { return /([0-9]{4})\s?-\s?([0-9]{4})/i }
  yearRangeParser.extract = function(text, ref, match, opt) {
    // Return a parsed result, that is 25 December
    var result = new chrono.ParsedResult({
      ref: ref,
      text: match[0],
      index: match.index,
      start: {
        year: match[1]
      },
      end: {
        year: match[1]
      }
    });
      result.end = result.start.clone();
    result.end.assign('year', match[2]);
    return result;
  }
  return yearRangeParser;
}

function Dater(date_text) {
  this.chrono =  new chrono.Chrono();
  this.chrono.parsers.push(_year_range_parser());
  this.parsed = this.chrono.parse(date_text);
}

Dater.prototype.start_year = function(date_text) {
  return this.parsed[0]['start']['knownValues']['year']
}

Dater.prototype.end_year = function(date_text) {
  return this.parsed[0]['end']['knownValues']['year']
}

module.exports = Dater;