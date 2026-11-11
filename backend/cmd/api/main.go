package main

import (
	"log"
	"weekflow-backend/internal/database"
	"weekflow-backend/internal/router"
)

func main() {
	// 1. Inicializar la conexión a PostgreSQL
	database.ConnectDB()

	// 2. Configurar las rutas del servidor
	r := router.SetupRouter()

	log.Println("Servidor corriendo en http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Error al iniciar el servidor: %v", err)
	}
}
