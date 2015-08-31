/**
Test Notes:
* More on "done()": http://mochajs.org/#asynchronous-code
**/

'use strict';
var appRoot = require('app-root-path');
var Bayeser = require(appRoot + '/lib/bayeser.js');
var assert = require("assert")
var fs = require('fs');

var bayes, ham, spam;
var corpus = 'foo'
beforeEach(function() {
  bayes = new Bayeser();
  ham  = bayes.addHam(['civil rights african american'], 'foo');
  spam = bayes.addSpam(['justin bieber comedy']);
  bayes.persistTrained(corpus)
});

describe('Bayeser', function() {
  it('recognizes spam', function (done) {
    var test = 'ThAnKyOu SO MUCH Justin Bieber?--XoXo--BLT :D BLOOPERS! african';
    bayes.getClassifications(test, corpus, function(result) {
      assert.deepEqual(result, {"classifications": [{"label":"spam","value":0.3333333333333333},{"label":"ham","value":0.16666666666666666}], "ham_or_spam":"spam"});
      done();
    });
  });

  it('recognizes ham', function (done) {
    var test = 'ThAnKyOu SO MUCH Justin Bieber?--XoXo--BLT :D BLOOPERS! african american civil rights';
    bayes.getClassifications(test, corpus, function(result) {
      assert.deepEqual(result, {"classifications": [{"label":"ham","value":0.16666666666666666},{"label":"spam","value":0.041666666666666664}], "ham_or_spam":"ham"});
      done();
    });
  });

  it('perists a set of trained documents to the cache', function () {
    var key = 'test123123123foo'
    var filepath = bayes.persistTrained('test123123123foo');
    fs.exists(filepath, function(exists) {
      assert.deepEqual(exists, True);
    });
    fs.unlinkSync(filepath);
  });
});