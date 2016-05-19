all: clean build test jshint jscs

clean:
	rm -rf dist

build: node_modules/webpack/bin/webpack
	./node_modules/webpack/bin/webpack.js 

test: build
	npm test

jshint: node_modules/jshint/bin/jshint
	./node_modules/jshint/bin/jshint --config=.jshintrc src

jscs: node_modules/jscs/bin/jscs
	./node_modules/jscs/bin/jscs src

node_modules/jshint/bin/jshint: build
	npm install jshint --prefix .

node_modules/jscs/bin/jscs: build
	npm install jscs --prefix .

node_modules/webpack/bin/webpack:
	npm install
