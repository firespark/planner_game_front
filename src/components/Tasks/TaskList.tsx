import { Stack, Paper } from '@mui/material';
import TaskListContent from './TaskListContent';
import TaskCreateButton from './TaskCreateButton';
import TaskEditDialog from './TaskEditDialog';
import TaskCreateDialog from './TaskCreateDialog';
import { useTaskManager } from '../../hooks/useTaskManager';
import { TaskData } from '../../types';

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
  } = useTaskManager(tasks, date, project_id);

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: isPast ? '#e0e0e0' : isToday ? '#e7fbe7' : 'white',
        opacity: isPast ? 0.5 : 1,
        padding: 1,
        marginTop: 1,
        borderRadius: 2,
        border: isToday ? '2px solid green' : undefined,
      }}
    >
      <Stack spacing={2}>
        {!isPast && <TaskCreateButton onClick={() => setCreateDialogOpen(true)} />}
        <TaskListContent
          tasks={currentTasks}
          isPast={isPast}
          onEdit={handleEditClick}
          onToggleDone={handleToggleDone}
        />
        <TaskEditDialog
          open={dialogOpen}
          task={selectedTask}
          onClose={handleDialogClose}
          onSave={handleSave}
          onDelete={handleDelete}
          error={error}
        />
        <TaskCreateDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onCreate={handleCreate}
          error={error}
        />
      </Stack>
    </Paper>
  );
};

export default TaskList;
