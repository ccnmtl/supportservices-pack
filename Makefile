all: clean build jshint jscs

clean:
	rm -rf dist
	rm -rf node_modules

jshint: node_modules/jshint/bin/jshint
	./node_modules/jshint/bin/jshint --config=.jshintrc src

jscs: node_modules/jscs/bin/jscs
	./node_modules/jscs/bin/jscs src

node_modules/jshint/bin/jshint:
	npm install jshint --prefix .

node_modules/jscs/bin/jscs:
	npm install jscs --prefix .

build: node_modules/webpack/bin/webpack
	./node_modules/webpack/bin/webpack.js 

node_modules/webpack/bin/webpack:
	npm install
