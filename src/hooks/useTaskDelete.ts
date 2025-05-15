import { TaskData } from '../types';
import { useProjectContext } from '../context/ProjectContext';
import { fetchDeleteTask } from '../api/apiTasks';

interface UseTaskDeleteParams {
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  closeEditDialog: () => void;
  setError: (error: string) => void;
}

export function useTaskDelete({ setTasks, closeEditDialog, setError }: UseTaskDeleteParams) {
  const { maxPoints, setMaxPoints, totalPoints, setTotalPoints } = useProjectContext();

  async function deleteTask(id: number) {
    let taskToDelete: TaskData | undefined;

    setTasks((prevTasks) => {
      taskToDelete = prevTasks.find((t) => t.id === id);
      return prevTasks;
    });

    if (!taskToDelete) {
      setError('Task not found');
      return;
    }

    try {
      const data = await fetchDeleteTask(id);

      if (data.success) {
        setTasks((prev) => prev.filter((t) => t.id !== id));

        setMaxPoints(maxPoints - taskToDelete.start_points);

        if (taskToDelete.completed) {
          setTotalPoints(totalPoints - taskToDelete.start_points);
        }

        closeEditDialog();
      } else {
        setError(data.error || 'Failed to delete task');
      }
    } catch {
      setError('Request failed');
    }
  }

  return { deleteTask };
}
