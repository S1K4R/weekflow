package handlers

import (
	"net/http"

	"weekflow-backend/internal/models"
	"weekflow-backend/internal/repository"

	"github.com/gin-gonic/gin"
)

// GetTask maneja GET /api/tasks
func GetTask(c *gin.Context) {
	tasks, err := repository.GetAllTasks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, tasks)
}

// CreateTask maneja POST /api/tasks
func CreateTask(c *gin.Context) {
	var newTask models.Task
	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := repository.CreateTask(newTask); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newTask)
}

// ToggleTask maneja PATCH /api/tasks/:id/toggle
func ToggleTask(c *gin.Context) {
	id := c.Param("id")

	updatedTask, err := repository.ToggleTask(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tarea no encontrada o error al actualizar"})
		return
	}

	c.JSON(http.StatusOK, updatedTask)
}
