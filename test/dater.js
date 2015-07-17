'use strict';
var appRoot = require('app-root-path');
var Dater = require(appRoot + '/lib/dater.js');
var dater = new Dater();
var assert = require("assert")

var dater
beforeEach(function() {
  dater = new Dater();
});

describe('Dater', function() {
  it('parses year ranges without months and days', function () {
    assert_years(new Dater('(1755-1990)'));
    assert_years(new Dater('[1755-1990]'));
    assert_years(new Dater('[1755 - 1990]'));
    assert_years(new Dater('[1755 - 1990] Minnesota'));
  });
});

function assert_years(dater) {
  assert.equal(dater.start_year(), '1755');
  assert.equal(dater.end_year(), '1990');
}