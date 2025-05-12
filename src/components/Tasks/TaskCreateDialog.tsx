import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, points: number) => void;
  error: string;
}

const TaskCreateDialog = ({ open, onClose, onCreate, error }: Props) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(60);

  const handleSubmit = () => {
    onCreate(title.trim(), points);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          autoFocus
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Points"
          type="number"
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskCreateDialog;
