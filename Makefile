d-up:
	docker compose --env-file .env.development up -d

d-down:
	docker compose --env-file .env.development down