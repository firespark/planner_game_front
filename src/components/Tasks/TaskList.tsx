import { List, Stack, IconButton } from '@mui/material';
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
      body: JSON.stringify({ title: updatedTask.title }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? { ...t, title: updatedTask.title } : t))
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
    setTasks((prev) => prev.filter((t) => t.id !== id));
    handleDialogClose();
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


  const undoneTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <IconButton onClick={() => setCreateDialogOpen(true)} size="small">
          <AddIcon />
        </IconButton>
      </Stack>

      <List dense>
        {undoneTasks.map((task) => (
          <Task key={task.id} task={task} onEdit={() => handleEditClick(task)} />
        ))}
      </List>

      {doneTasks.length > 0 && (
        <List dense>
          {doneTasks.map((task) => (
            <Task key={task.id} task={task} onEdit={() => handleEditClick(task)} />
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
  );
};

export default TaskList;
