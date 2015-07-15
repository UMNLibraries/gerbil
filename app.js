var path    = require('path')
var connect = require('connect')
var appRoot = require('app-root-path');
var Bayeser = require(appRoot + '/lib/bayeser.js');
var bayes = new Bayeser();

var app = connect();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
app.use(bodyParser.json({ type: 'application/*+json', limit: '200mb' }));

app.use('/test', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  bayes.getClassifications(req.body.test, req.body.corpus, function(result) {
    res.end(JSON.stringify(result));
  });
})

app.use('/train', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  bayes.addHam(req.body.ham.split("\n"));
  bayes.addSpam(req.body.spam.split("\n"));
  var filepath = bayes.persistTrained(req.body.corpus);
  res.end(JSON.stringify({"status": "" + path.basename(filepath) + " (" + req.body.corpus + ") has been trained. Good gerbil."}));
})

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

