var path    = require('path')
var connect = require('connect')
var appRoot = require('app-root-path');
var Bayeser = require(appRoot + '/lib/bayeser.js');
var bayes = new Bayeser();
var Dater = require(appRoot + '/lib/dater.js');
var dater = new Dater();

var app = connect();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
app.use(bodyParser.json({ type: 'application/*+json', limit: '200mb' }));

app.use('/spam/test', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  bayes.getClassifications(req.body.test, req.body.corpus, function(result) {
    res.end(JSON.stringify(result));
  });
})

app.use('/spam/train', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  bayes.addHam(req.body.ham.split("\n"));
  bayes.addSpam(req.body.spam.split("\n"));
  var filepath = bayes.persistTrained(req.body.corpus);
  res.end(JSON.stringify({"status": "" + path.basename(filepath) + " (" + req.body.corpus + ") has been trained. Good gerbil."}));
})

app.use('/date/parse', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  date = dater.parse(req.body.date_text);
  res.end({"date": JSON.stringify(date)});
})

var server = app.listen(8000, function () {
  console.log('Gerbil listening');
});

