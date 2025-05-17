import { Stack, Paper } from '@mui/material';
import TaskListContent from './TaskListContent';
import TaskCreateButton from './TaskCreateButton';
import TaskEditDialog from './TaskEditDialog';
import TaskCreateDialog from './TaskCreateDialog';
import { TaskData } from '../../types';
import { useTasksState } from '../../hooks/useTasksState';
import { useTaskUpdate } from '../../hooks/useTaskUpdate';
import { useTaskDelete } from '../../hooks/useTaskDelete';
import { useTaskCreate } from '../../hooks/useTaskCreate';
import { useTaskDone } from '../../hooks/useTaskDone';

import '../../assets/tasksStyle.css';
import { getTodayBoxShadowClass } from '../../helpers/styleHelpers';

interface Props {
  tasks: TaskData[];
  date: string;
  project_id: number;
  isPast: boolean;
  isToday: boolean;
}

const TaskList = ({ tasks, date, project_id, isPast, isToday }: Props) => {
  const {
    tasks: currentTasks,
    setTasks,
    selectedTask,
    dialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
    error,
    setError,
    openEditDialog,
    closeEditDialog,
  } = useTasksState(tasks);

  const { updateTask } = useTaskUpdate({
    setTasks,
    closeEditDialog,
    setError,
  });
  const { deleteTask } = useTaskDelete({ setTasks, closeEditDialog, setError });
  const { createTask } = useTaskCreate({ date, project_id, setTasks, setCreateDialogOpen, setError });
  const { markAsDone } = useTaskDone({ setTasks, setError });

  const paperClasses = ['task-list-paper'];
  if (isPast) paperClasses.push('past');
  else if (isToday) paperClasses.push('today');

  const glowClass = getTodayBoxShadowClass(isToday);

  return (
    <Paper elevation={3} className={`${paperClasses.join(' ')} ${glowClass}`}>
      <Stack spacing={2}>
        {!isPast && <TaskCreateButton onClick={() => setCreateDialogOpen(true)} />}
        <TaskListContent
          tasks={currentTasks}
          isPast={isPast}
          onEdit={openEditDialog}
          onToggleDone={markAsDone}
        />
        <TaskEditDialog
          open={dialogOpen}
          task={selectedTask}
          onClose={closeEditDialog}
          onSave={updateTask}
          onDelete={deleteTask}
          error={error}
        />
        <TaskCreateDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onCreate={createTask}
          error={error}
        />
      </Stack>
    </Paper>
  );
};

export default TaskList;
