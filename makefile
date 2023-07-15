postgres: 
	docker run --name postgresGoDB -p 5433:5432 -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=root -d postgis/postgis

createdb:
	docker exec -it postgresGoDB createdb --username=root --owner=root gobackend

dropdb:
	docker exec -it postgresGoDB dropdb gobackend

migrateup:
	migrate -path db/migration -database "postgresql://root:mysecretpassword@localhost:5433/gobackend?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migration -database "postgresql://root:mysecretpassword@localhost:5433/gobackend?sslmode=disable" -verbose down

go: 
	cd ./src && go run main.go