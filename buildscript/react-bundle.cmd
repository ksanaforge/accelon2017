browserify -r react -r react-dom  | uglifyjs --screw-ie8 -c=dead_code,evaluate,loops,unused -m > ../static/react-bundle.min.js
browserify -r react -r react-dom  > ../static/react-bundle.js