package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port        string
	DatabaseURL string
}

// LoadConfig lee las variables de entorno desde .env o el sistema
func LoadConfig() *Config {
	// Intentar cargar .env (en producción en la nube no existirá .env, se usarán vars del sistema)
	if err := godotenv.Load(); err != nil {
		log.Println("Nota: No se encontró archivo .env, usando variables de entorno del sistema")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Puerto por defecto si no se define
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("ERROR CRÍTICO: La variable DATABASE_URL no está configurada")
	}

	return &Config{
		Port:        port,
		DatabaseURL: dbURL,
	}
}
