import { List, Stack, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { TaskData } from '../../types';
import Task from './Task';
import TaskEditDialog from './TaskEditDialog';
import TaskCreateDialog from './TaskCreateDialog';

interface Props {
  tasks: TaskData[];
  date: string;
  project_id: number;
}

const TaskList = ({ tasks: initialTasks, date, project_id }: Props) => {
  const [tasks, setTasks] = useState<TaskData[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const today = new Date(new Date().toDateString());
  const slotDate = new Date(date);
  const isPast = slotDate < today;
  const isToday = slotDate.getTime() === today.getTime();

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
          setError('');
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
          setError('');
          handleDialogClose();
        } else {
          setError(data.error || 'Failed to delete task');
        }
      })
      .catch(() => {
        setError('Request failed');
      });
  };

  const handleCreate = (title: string, points: number) => {
    fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        points,
        date,
        project_id
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
            date
          };
          setTasks((prev) => [...prev, newTask]);
          setError('');
          setCreateDialogOpen(false);
        } else {
          setError(data.error || 'Failed to create task');
        }
      })
      .catch(() => {
        setError('Request failed');
      });
  };

  const handleToggleDone = (taskId: number) => {
    fetch(`/api/tasks/done`, {
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
          setError('');
        } else {
          setError(data.error || 'Failed to mark task as done');
        }
      })
      .catch(() => {
        setError('Request failed');
      });
  };

  const undoneTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: isPast ? '#f0f0f0' : isToday ? '#e7fbe7' : 'white',
        opacity: isPast ? 0.5 : 1,
        padding: 2,
        borderRadius: 2,
        border: isToday ? '2px solid green' : undefined
      }}
    >
      <Stack spacing={2}>
        {!isPast && (
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <IconButton onClick={() => setCreateDialogOpen(true)} size="small">
              <AddIcon />
            </IconButton>
          </Stack>
        )}

        <List dense>
          {undoneTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={!isPast ? () => handleEditClick(task) : undefined}
              onToggleDone={!isPast ? () => handleToggleDone(task.id) : undefined}
            />
          ))}
        </List>

        {doneTasks.length > 0 && (
          <List dense>
            {doneTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onEdit={!isPast ? () => handleEditClick(task) : undefined}
              />
            ))}
          </List>
        )}

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
