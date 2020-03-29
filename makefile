NAME=`jq .name -r package.json`
VERSION=`jq .version -r package.json`

run:
	npm run serve

build:
	docker build \
		--tag ${NAME}:${VERSION} \
		.

create-dotenv-file:
	@echo "VUE_APP_BACKEND_URL=http://dialogia.tuuturu.org:3000" >> .env
	@echo "VUE_APP_CHATSERVER_URL=ws://dialogia.tuuturu.org:8081" >> .env
