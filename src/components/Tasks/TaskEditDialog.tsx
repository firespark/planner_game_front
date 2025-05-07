import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { TaskData } from '../../types';

interface Props {
  open: boolean;
  task: TaskData | null;
  onClose: () => void;
  onSave: (task: TaskData) => void;
  onDelete: (id: number) => void;
}

const TaskEditDialog = ({ open, task, onClose, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
      setPoints(task.points ?? 0);
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    onSave({ ...task, title, completed, points });
  };

  const handleDelete = () => {
    if (!task) return;
    if (confirm('Точно удалить?')) {
      onDelete(task.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Редактировать задачу</DialogTitle>
      <DialogContent>
        <TextField
          label="Название"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Баллы"
          type="number"
          fullWidth
          margin="normal"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Выполнено"
        />
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
