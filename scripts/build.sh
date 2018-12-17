rm public/**/*.js
babel --presets react,es2015 src/ -d public/js/
browserify public/js/index.js -o public/js/bundle.js
