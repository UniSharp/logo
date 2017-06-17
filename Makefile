init:
	yarn install
	./node_modules/.bin/bower install
	make build

build:
	./node_modules/.bin/gulp

build-prod:
	./node_modules/.bin/gulp --production

watch:
	./node_modules/.bin/gulp watch

clean:
	./node_modules/.bin/gulp clean
	rm -rf bower_components node_modules
