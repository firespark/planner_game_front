import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

import '../../assets/tasksStyle.css';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, points: number) => void;
  error: string;
}

const TaskCreateDialog = ({ open, onClose, onCreate, error }: Props) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(60);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle('');
      setPoints(60);
      setLocalError(null);
    }
  }, [open]);

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setLocalError('Title is required');
      return;
    }

    if (!points || points <= 0) {
      setLocalError('Points must be a positive number');
      return;
    }

    setLocalError(null);
    onCreate(trimmedTitle, points);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPoints = parseInt(e.target.value, 10);
    if (!isNaN(newPoints)) {
      setPoints(newPoints);
    } else {
      setPoints(0);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box className="task-dialog-header">
        <DialogTitle className="task-dialog-title">Create Task</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        {(localError || error) && (
          <Alert severity="error">{localError || error}</Alert>
        )}
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
          onChange={handlePointsChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskCreateDialog;
