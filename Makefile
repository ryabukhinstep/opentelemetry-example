SHELL=/bin/bash

up-observable-instrument:
	docker compose up --build
start-first-service:
	cd first_service && npm ci && npm run start:dev
start-second-service:
	cd second_service && npm ci && npm run start:dev
start-third-service:
	cd third_service && npm ci && npm run start:dev
start:
	/bin/sh start-first-service && /bin/sh start-second-service && /bin/sh start-third-service