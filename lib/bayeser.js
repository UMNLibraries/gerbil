var natural = require('natural');
var appRoot = require('app-root-path');
var crypto = require('crypto')

function Bayeser() {
  this.classifier = new natural.BayesClassifier();
}

Bayeser.prototype.addHam = function(phrases) {
  _addPhrases(this.classifier, phrases, 'ham');
}

Bayeser.prototype.addSpam = function(phrases) {
  _addPhrases(this.classifier, phrases, 'spam');
}

Bayeser.prototype.persistTrained = function(corpus) {
  this.classifier.train();
  this.classifier.save(_corpus_cache_file(corpus));
  return _corpus_cache_file(corpus);
}

Bayeser.prototype.getClassifications = function(test, corpus, callback) {
  natural.BayesClassifier.load(_corpus_cache_file(corpus), null, function(err, classifier) {
    callback({"classifications": classifier.getClassifications(test), "ham_or_spam": classifier.classify(test)});
  });
}

function _corpus_cache_file(corpus) {
  var sha = crypto.createHash('sha1').update(corpus).digest("hex");
  return appRoot + '/cache/corpus_' + sha + '.json'
}

function _addPhrases(classifier, phrases, label) {
  for (var i = 0; i < phrases.length; i++) {
    classifier.addDocument(phrases[i], label);
  }
}

module.exports = Bayeser;