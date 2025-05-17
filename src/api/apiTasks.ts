import { TaskData } from '../types';
import { handleError } from '../helpers/errorHelpers';

export async function fetchUpdateTask(
  task: Pick<TaskData, 'id' | 'title' | 'completed'>
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`/api/tasks/update/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: task.title,
      completed: task.completed,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    handleError(response, data, 'Failed to update task');
  }

  return data;
}

export async function fetchMarkTaskDone(taskId: number): Promise<{ success: boolean; error?: string }> {
  const response = await fetch('/api/tasks/done', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: taskId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    handleError(response, data, 'Failed to mark task as done');
  }

  return data;
}

export async function fetchDeleteTask(id: number): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`/api/tasks/delete/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    handleError(response, data, 'Failed to delete task');
  }

  return data;
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

  const data = await response.json();

  if (!response.ok || !data.success) {
    handleError(response, data, 'Failed to create task');
  }

  return data;
}
