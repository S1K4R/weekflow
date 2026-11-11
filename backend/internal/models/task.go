package models

import "time"

type Task struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	TargetDate  string    `json:"target_date"` // YYYY-MM-DD
	IsCompleted bool      `json:"is_completed"`
	Color       string    `json:"color"`
	Position    int       `json:"position"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
