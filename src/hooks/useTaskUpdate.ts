import { TaskData } from '../types';
import { useProjectContext } from '../context/ProjectContext';
import { fetchUpdateTask } from '../api/apiTasks';

interface UseTaskUpdateParams {
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  closeEditDialog: () => void;
  setError: (error: string) => void;
  onUpdateSuccess: (task: TaskData) => void;
}

export function useTaskUpdate({ setTasks, closeEditDialog, setError, onUpdateSuccess }: UseTaskUpdateParams) {
  const { totalPoints, setTotalPoints } = useProjectContext();

  function updateTask(updatedTask: TaskData) {
    fetchUpdateTask({
      id: updatedTask.id,
      title: updatedTask.title,
      completed: updatedTask.completed,
    })
      .then((data) => {
        if (data.success) {
          let pointsDelta = 0;

          setTasks((prevTasks) =>
            prevTasks.map((task) => {
              if (task.id === updatedTask.id) {
                if (!task.completed && updatedTask.completed) {
                  pointsDelta = task.start_points;
                } else if (task.completed && !updatedTask.completed) {
                  pointsDelta = -task.start_points;
                }

                return {
                  ...task,
                  title: updatedTask.title,
                  completed: updatedTask.completed,
                };
              }
              return task;
            })
          );

          if (pointsDelta !== 0) {
            setTotalPoints(totalPoints + pointsDelta);
          }

          onUpdateSuccess(updatedTask);
          closeEditDialog();
        } else {
          setError(data.error || 'Failed to update task');
        }
      })
      .catch((error) => {
        if (error instanceof Error && error.message) {
          setError(error.message);
        } else {
          setError('Request failed');
        }
      });
  }

  return { updateTask };
}
