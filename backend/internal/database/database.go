package database

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var DB *pgxpool.Pool

func ConnectDB() {
	// Cargar variables de entorno desde .env
	_ = godotenv.Load()

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("La variable DATABASE_URL no está configurada en el archivo .env")
	}

	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		log.Fatalf("Error al parsear la configuración de PostgreSQL: %v", err)
	}

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("Error al crear el pool de conexiones: %v", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		log.Fatalf("No se pudo hacer ping a PostgreSQL: %v", err)
	}

	DB = pool
	log.Println("¡Conexión exitosa a PostgreSQL (weekflow_db)!")
}
