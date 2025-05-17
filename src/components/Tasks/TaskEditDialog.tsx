import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { TaskData } from '../../types';
import { getPointsBackgroundColor } from '../../helpers/styleHelpers';

import '../../assets/tasksStyle.css';

interface Props {
  open: boolean;
  task: TaskData | null;
  onClose: () => void;
  onSave: (task: TaskData) => void;
  onDelete: (id: number) => void;
  error: string;
}

const TaskEditDialog = ({ open, task, onClose, onSave, onDelete, error }: Props) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
      setLocalError(null);
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setLocalError('Title is required');
      return;
    }

    setLocalError(null);
    onSave({ ...task, title: trimmedTitle, completed });
  };

  const handleDelete = () => {
    if (!task) return;
    if (confirm('Confirm deletion?')) {
      onDelete(task.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box className="task-dialog-header">
        <DialogTitle className="task-dialog-title">Edit Task</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        {(localError || error) && (
          <Alert severity="error">{localError || error}</Alert>
        )}

        {task && (
          <Box className="task-points-container">
            <Typography variant="body2" color="text.secondary">
              Points:
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              {task.points < task.start_points && (
                <Typography variant="body1" className="task-points-line-through">
                  {task.start_points} pts
                </Typography>
              )}

              <Typography
                variant="body1"
                color="text.secondary"
                className="task-points-value"
                style={{ backgroundColor: getPointsBackgroundColor(task.points) }}
              >
                {task.points} pts
              </Typography>
            </Box>
          </Box>
        )}

        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Done"
        />
      </DialogContent>

      <DialogActions className="dialog-actions-space-between">
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
        <Box>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            className="dialog-actions-buttons-margin-left"
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
