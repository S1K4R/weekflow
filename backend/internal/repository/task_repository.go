package repository

import (
	"context"
	"fmt"

	"weekflow-backend/internal/database"
	"weekflow-backend/internal/models"
)

// GetAllTasks obtiene todas las tareas almacenadas en PostgreSQL
func GetAllTasks() ([]models.Task, error) {
	query := `SELECT id, title, target_date, is_completed, color, position FROM tasks ORDER BY position ASC`

	rows, err := database.DB.Query(context.Background(), query)
	if err != nil {
		return nil, fmt.Errorf("error al consultar tareas: %v", err)
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var t models.Task
		err := rows.Scan(&t.ID, &t.Title, &t.TargetDate, &t.IsCompleted, &t.Color, &t.Position)
		if err != nil {
			return nil, fmt.Errorf("error al escanear tarea: %v", err)
		}
		tasks = append(tasks, t)
	}

	if tasks == nil {
		tasks = []models.Task{}
	}

	return tasks, nil
}

// CreateTask inserta una nueva tarea en PostgreSQL
func CreateTask(task models.Task) error {
	query := `INSERT INTO tasks (id, title, target_date, is_completed, color, position) VALUES ($1, $2, $3, $4, $5, $6)`

	_, err := database.DB.Exec(context.Background(), query, task.ID, task.Title, task.TargetDate, task.IsCompleted, task.Color, task.Position)
	if err != nil {
		return fmt.Errorf("error al insertar tarea: %v", err)
	}

	return nil
}

// ToggleTask invierte el estado is_completed de una tarea en PostgreSQL
func ToggleTask(id string) (models.Task, error) {
	query := `UPDATE tasks SET is_completed = NOT is_completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, title, target_date, is_completed, color, position`

	var t models.Task
	err := database.DB.QueryRow(context.Background(), query, id).Scan(&t.ID, &t.Title, &t.TargetDate, &t.IsCompleted, &t.Color, &t.Position)
	if err != nil {
		return t, fmt.Errorf("error al actualizar tarea: %v", err)
	}

	return t, nil
}
