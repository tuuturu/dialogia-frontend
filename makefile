NAME=`jq .name -r package.json`
VERSION=`jq .version -r package.json`

run:
	npm run serve

build:
	docker build \
		--tag ${NAME}:${VERSION} \
		.
