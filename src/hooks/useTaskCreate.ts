import { TaskData } from '../types';
import { useProjectContext } from '../context/ProjectContext';
import { fetchCreateTask } from '../api/apiTasks';

interface UseTaskCreateParams {
  date: string;
  project_id: number;
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  setCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (error: string) => void;
}

export function useTaskCreate({
  date,
  project_id,
  setTasks,
  setCreateDialogOpen,
  setError,
}: UseTaskCreateParams) {
  const { maxPoints, setMaxPoints } = useProjectContext();

  async function createTask(title: string, points: number) {
    try {
      const data = await fetchCreateTask(title, points, date, project_id);

      if (data.success && data.id) {
        const newTask: TaskData = {
          id: +data.id,
          title,
          points,
          start_points: points,
          completed: false,
          date,
        };

        setTasks(prev => prev.concat(newTask));
        setCreateDialogOpen(false);
        setMaxPoints(maxPoints + points);
      } else {
        setError(data.error || 'Failed to create task');
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError('Request failed');
      }
    }
  }

  return { createTask };
}
