SHELL=/bin/bash

NAME=`jq .name -r package.json`
VERSION=`jq .version -r package.json`
REPOSITORY=docker.pkg.github.com/tuuturu/dialogia-frontend

run:
	npm run serve

build:
	docker build \
		--tag ${REPOSITORY}/${NAME}:${VERSION} \
		--tag ${REPOSITORY}/${NAME}:latest \
		.

push-image:
	docker push ${REPOSITORY}/${NAME}:${VERSION}

create-dotenv-file:
	@echo "VUE_APP_BACKEND_URL=http://tuuturu.org:3000" >> .env
	@echo "Created .env file. This file will be used when building the docker image"
