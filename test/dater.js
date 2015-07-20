'use strict';
var appRoot = require('app-root-path');
var Dater = require(appRoot + '/lib/dater/dater.js');
var dater = new Dater();
var assert = require("assert")

describe('Dater', function() {
  it('parses year ranges without months and days', function () {
    assert_years(new Dater('(1755-1990)'));
    assert_years(new Dater('[1755-1990]'));
    assert_years(new Dater('[1755  1990]'));
    assert_years(new Dater('17551990'));
    assert_years(new Dater('[1755 - 1990]'));
    assert_years(new Dater('[1755 - 1990] Minnesota'));
  });

  it('finds and parses single years', function () {
    dater = new Dater('1932 1');
    assert.equal(dater.start_year(), '1932');
  });

  it('finds and parses a year with a month', function () {
    dater = new Dater('1932-01');
    var month = dater.parsed[0]['start']['knownValues']['month']
    assert.equal(month, '01');
    assert.equal(dater.start_year(), '1932');
  });
});

function assert_years(dater) {
  assert.equal(dater.start_year(), '1755');
  assert.equal(dater.end_year(), '1990');
}