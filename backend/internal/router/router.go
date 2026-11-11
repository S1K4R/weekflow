package router

import (
	"net/http"

	"weekflow-backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

// Middleware para habilitar CORS
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

// SetupRouter configura los endpoints de la API
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Aplicar CORS
	r.Use(corsMiddleware())

	// Grupo de rutas de la API
	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong", "status": "ok"})
		})

		// Rutas de tareas
		api.GET("/tasks", handlers.GetTask)
		api.POST("/tasks", handlers.CreateTask)
		api.PATCH("/tasks/:id/toggle", handlers.ToggleTask)
	}

	return r
}
