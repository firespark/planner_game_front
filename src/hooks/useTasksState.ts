import { useState } from 'react';
import { TaskData } from '../types';

export function useTasksState(initialTasks: TaskData[]) {
  const [tasks, setTasks] = useState<TaskData[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [error, setError] = useState<string>('');

  function openEditDialog(task: TaskData) {
    setSelectedTask(task);
    setDialogOpen(true);
  }

  function closeEditDialog() {
    setSelectedTask(null);
    setDialogOpen(false);
    setError('');
  }

  return {
    tasks,
    setTasks,
    selectedTask,
    dialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
    error,
    setError,
    openEditDialog,
    closeEditDialog,
  };
}
