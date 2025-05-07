import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, points: number) => void;
}

const TaskCreateDialog = ({ open, onClose, onCreate }: Props) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(1);

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate(title.trim(), points);
      setTitle('');
      setPoints(1);
    }
  };

  const handleClose = () => {
    setTitle('');
    setPoints(1);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Создание задачи</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
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
          inputProps={{ min: 1 }}
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">Создать</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskCreateDialog;
