import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, points: number) => void;
  error: string;
}

const TaskCreateDialog = ({ open, onClose, onCreate, error }: Props) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(60);

  useEffect(() => {
    if (open) {
      setTitle('');
      setPoints(60);
    }
  }, [open]);

  const handleSubmit = () => {
    onCreate(title.trim(), points);
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
        <DialogTitle sx={{ p: 0 }}>Create Task</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

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
