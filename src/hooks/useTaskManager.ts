import { useState } from 'react';
import { TaskData } from '../types';

export const useTaskManager = (
  initialTasks: TaskData[],
  date: string,
  project_id: number
) => {
  const [tasks, setTasks] = useState<TaskData[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const handleEditClick = (task: TaskData) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedTask(null);
    setError('');
  };

  const handleSave = (updatedTask: TaskData) => {
    fetch(`/api/tasks/update/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updatedTask.title,
        completed: updatedTask.completed,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === updatedTask.id
                ? { ...t, title: updatedTask.title, completed: updatedTask.completed }
                : t
            )
          );
          handleDialogClose();
        } else {
          setError(data.error || 'Failed to update task');
        }
      })
      .catch(() => setError('Request failed'));
  };

  const handleDelete = (id: number) => {
    fetch(`/api/tasks/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prev) => prev.filter((t) => t.id !== id));
          handleDialogClose();
        } else {
          setError(data.error || 'Failed to delete task');
        }
      })
      .catch(() => setError('Request failed'));
  };

  const handleCreate = (title: string, points: number) => {
    fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        points,
        date,
        project_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const newTask: TaskData = {
            id: data.id,
            title,
            points,
            completed: false,
            date,
          };
          setTasks((prev) => [...prev, newTask]);
          setCreateDialogOpen(false);
        } else {
          setError(data.error || 'Failed to create task');
        }
      })
      .catch(() => setError('Request failed'));
  };

  const handleToggleDone = (taskId: number) => {
    fetch('/api/tasks/done', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === taskId ? { ...task, completed: true } : task
            )
          );
        } else {
          setError(data.error || 'Failed to mark task as done');
        }
      })
      .catch(() => setError('Request failed'));
  };

  return {
    tasks,
    error,
    selectedTask,
    dialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
    handleEditClick,
    handleDialogClose,
    handleSave,
    handleDelete,
    handleCreate,
    handleToggleDone,
  };
};
