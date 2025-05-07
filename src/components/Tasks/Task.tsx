import { ListItem, ListItemText, Checkbox, IconButton, Stack, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TaskData } from '../../types';

interface Props {
  task: TaskData;
  onEdit: () => void;
}

const Task = ({ task, onEdit }: Props) => {
  const textStyle = {
    textDecoration: task.completed ? 'line-through' : 'none',
    color: task.completed ? 'gray' : 'inherit',
  };

  const getPointsBackgroundColor = (points: number) => {
    if (points <= 100) return 'lightgreen';
    if (points <= 500) return 'lightyellow';
    if (points <= 1000) return 'lightcoral';
    return 'lightgray';
  };

  return (
    <>
      <ListItem
        disableGutters
        secondaryAction={
          <IconButton edge="end" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        }
      >
        <Checkbox edge="start" checked={task.completed} disabled />
        <ListItemText
          primary={
            <Stack direction="column" spacing={1}>
              <Typography sx={textStyle}>{task.title}</Typography>
              {/* Баллы с фоном в зависимости от значения */}
              <Typography
                sx={textStyle}
                color="text.secondary"
                style={{
                  backgroundColor: getPointsBackgroundColor(task.points),
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {task.points} pts
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <Divider sx={{opacity: 0.8}} />
    </>
  );
};

export default Task;
