SHELL=/bin/bash

NAME=`jq .name -r package.json`
VERSION=`jq .version -r package.json`
REPOSITORY=docker.pkg.github.com/tuuturu/dialogia-frontend

run:
	npm run serve

bump:
	npm version patch

build:
	docker build \
		--tag ${REPOSITORY}/${NAME}:${VERSION} \
		--tag ${REPOSITORY}/${NAME}:latest \
		.

push-image:
	docker push ${REPOSITORY}/${NAME}:${VERSION}

release: bump build push-image
	@echo "🚀 Release is ready for deploy"

create-local-dotenv-file:
	@echo "VUE_APP_BACKEND_URL=http://localhost:3000" > .env.local
	@echo "VUE_APP_CHATSERVER_URL=ws://localhost:8081" >> .env.local
	@echo "Created .env file. This file will be used when building the docker image"
