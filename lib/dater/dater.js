var chrono = require('chrono-node')
var appRoot = require('app-root-path');

// Custom Parsers
var year_range_parser = require(appRoot + '/lib/dater/parsers/year_range_parser.js');
var single_year_parser = require(appRoot + '/lib/dater/parsers/single_year_parser.js');
var year_month_parser = require(appRoot + '/lib/dater/parsers/year_month_parser.js');

function Dater(date_text) {
  this.chrono =  chrono.casual;
  this.chrono.parsers.unshift(year_range_parser);
  this.chrono.parsers.unshift(single_year_parser);
  this.chrono.parsers.unshift(year_month_parser);
  this.parsed = this.chrono.parse(date_text);
}

Dater.prototype.parsed = function(date_text) {
  return this.parsed
}

Dater.prototype.start_year = function(date_text) {
  return this.parsed[0]['start']['knownValues']['year']
}

Dater.prototype.end_year = function(date_text) {
  return this.parsed[0]['end']['knownValues']['year']
}

module.exports = Dater;