@echo off
set NODE_ENV=production
browserify src/index.js -t [ babelify --presets es2015 ]  -u react-native -x ksana-codemirror -x codemirror  -x react -x react-dom  | uglifyjs --screw-ie8 -c=dead_code,evaluate,loops,unused -m > static/bundle.js
set NODE_ENV=development