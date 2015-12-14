#!/bin/bash

mkdir -p dist
browserify src/client.js -s socketty -o dist/socketty.js
uglifyjs dist/socketty.js -o dist/socketty.min.js
