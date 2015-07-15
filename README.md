# Gerbil

A better hamster. Simple and fast spam detection via the [natural](https://github.com/NaturalNode/natural) language facility framework and node.

## Installation

* Install node (e.g. via [ndenv](https://github.com/riywo/ndenv) or [nvm](https://github.com/creationix/nvm))
* Downlow Gerbil and install its dependencies

```
$ git clone git@github.com/UMNLibraries/gerbil.git
$ cd gerbil
$ npm install
```

## Run the app

`$ node app.js`

(more on deploying node to production [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04))


## Usage

Gerbil ferrets away a trained set of ham/spam data in order to lower the overhead of spam testing on each individual test transaction.

### Train Gerbil

```
curl --data "spam=
I HATE JUSTIN BIEBER comedy
JUSTIN BIEBER WEDDING comedy
&ham=
story about the big bang
recently in science, discoveries were made
&corpus=foo" http://localhost:8000/train

```

## Test the trained data

```
curl --data "test=justin beiber recently discoveries invention with science&corpus=foo" http://localhost:8000/test
[{"label":"ham","value":0.059259259259259255},{"label":"spam","value":0.02222222222222222}]
```

## Todo
* Add app configuration method for port, IP, etc
* Add logging
* Error reporting for missing required fields (ham, spam, test, corpus)
* Error reporting for missing corpus (corpus has not been persisted before a test has been run)