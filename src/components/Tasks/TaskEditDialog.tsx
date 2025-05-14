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
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { TaskData } from '../../types';
import { getPointsBackgroundColor } from '../../helpers/styleHelpers';

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

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    onSave({ ...task, title, completed });
  };

  const handleDelete = () => {
    if (!task) return;
    if (confirm('Confirm deletion?')) {
      onDelete(task.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 3,
          pr: 1,
          pt: 2,
        }}
      >
        <DialogTitle sx={{ p: 0 }}>Edit task</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {task && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Points:
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              {task.points < task.start_points && (
                <Typography
                  variant="body1"
                  color="text.disabled"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {task.start_points} pts
                </Typography>
              )}

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  backgroundColor: getPointsBackgroundColor(task.points),
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  width: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {task.points} pts
              </Typography>
            </Box>
          </Box>
        )}

        <TextField
          label="title"
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

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
        <Box>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ ml: 1 }}>
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default TaskEditDialog;
