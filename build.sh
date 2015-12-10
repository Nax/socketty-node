#!/bin/bash

mkdir -p dist
browserify src/client.js -s socketty -o dist/socketty.js
uglify -s dist/socketty.js -o dist/socketty.min.js
