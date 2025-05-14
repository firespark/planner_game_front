import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TaskData } from '../../types';
import { getPointsBackgroundColor } from '../../helpers/styleHelpers';

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
          py: 0.5,
          px: 2,
          position: 'relative',
          backgroundColor: task.completed ? '#d2ebf0' : 'transparent',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            <IconButton
              edge="end"
              onClick={onEdit}
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                padding: 1,
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          ) : null
        }
      >
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={onToggleDone}
          disabled={task.completed || onToggleDone === undefined}
          size="small"
          sx={{
            p: 0,
            mr: 1,
          }}
        />

        <ListItemText
          primary={
            <Stack direction="column" spacing={0.5} sx={{ width: '100%' }}>
              <Typography fontSize="14px" lineHeight={1.2}>
                {task.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  backgroundColor: getPointsBackgroundColor(task.points),
                  px: 1,
                  py: 0.25,
                  borderRadius: '4px',
                  fontSize: '12px',
                  width: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {task.points} pts
                {task.points < task.start_points && (
                  <ArrowDownwardIcon fontSize="inherit" sx={{ color: 'red' }} />
                )}
              </Typography>
            </Stack>
          }
        />
      </ListItem>

      <Divider sx={{ opacity: 0.3, my: 0.25 }} />
    </>
  );
};

export default Task;
