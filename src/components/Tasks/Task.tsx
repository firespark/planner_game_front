import { ListItem, ListItemText, Checkbox, IconButton, Stack, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TaskData } from '../../types';
import {getPointsBackgroundColor} from '../../helpers/common';

interface Props {
  task: TaskData;
  onEdit?: () => void;
  onToggleDone?: () => void;
}

const Task = ({ task, onEdit, onToggleDone }: Props) => {

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          position: 'relative',
          backgroundColor: task.completed ? '#f9f9f9' : 'transparent',
          overflow: 'hidden',
          '&::after': task.completed
            ? {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'gray',
              transform: 'translateY(-50%)',
            }
            : {},
        }}
        secondaryAction={
          onEdit ? (
            <IconButton edge="end" onClick={onEdit}>
              <EditIcon />
            </IconButton>
          ) : null
        }
      >
        {onToggleDone !== undefined ? (
          <Checkbox
            edge="start"
            checked={task.completed}
            onChange={onToggleDone}
            disabled={task.completed}
          />
        ) : (
          <Checkbox edge="start" checked={task.completed} disabled />
        )}

        <ListItemText
          primary={
            <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
              <Typography>{task.title}</Typography>
              <Typography
                color="text.secondary"
                sx={{
                  backgroundColor: getPointsBackgroundColor(task.points),
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  width: 'fit-content',
                }}
              >
                {task.points} pts
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <Divider sx={{ opacity: 0.8 }} />
    </>
  );
};

export default Task;
