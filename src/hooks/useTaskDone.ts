import { TaskData } from '../types';
import { useProjectContext } from '../context/ProjectContext';
import { fetchMarkTaskDone } from '../api/apiTasks';

interface UseTaskDoneParams {
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  setError: (error: string) => void;
}

export function useTaskDone({ setTasks, setError }: UseTaskDoneParams) {
  const { totalPoints, setTotalPoints } = useProjectContext();

  async function markAsDone(taskId: number) {
    try {
      const data = await fetchMarkTaskDone(taskId);

      if (data.success) {
        let addedPoints = 0;

        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.id === taskId && !task.completed) {
              addedPoints = task.start_points;
              return { ...task, completed: true };
            }
            return task;
          })
        );

        if (addedPoints > 0) {
          setTotalPoints(totalPoints + addedPoints);
        }
      } else {
        setError(data.error || 'Failed to mark task as done');
      }
    } catch {
      setError('Request failed');
    }
  }

  return { markAsDone };
}
