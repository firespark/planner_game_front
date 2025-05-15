import { TaskData } from '../types';

export async function fetchUpdateTask(task: Pick<TaskData, 'id' | 'title' | 'completed'>): Promise<{
  success: boolean;
  error?: string;
}> {
  const response = await fetch(`/api/tasks/update/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: task.title,
      completed: task.completed,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
}

export async function fetchMarkTaskDone(taskId: number): Promise<{ success: boolean; error?: string }> {
  const response = await fetch('/api/tasks/done', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: taskId }),
  });

  if (!response.ok) {
    throw new Error('Failed to mark task as done');
  }

  return response.json();
}

export async function fetchDeleteTask(id: number): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`/api/tasks/delete/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return response.json();
}

export async function fetchCreateTask(
  title: string,
  points: number,
  date: string,
  project_id: number
): Promise<{ success: boolean; id?: number; error?: string }> {
  const response = await fetch('/api/tasks/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, points, date, project_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
}