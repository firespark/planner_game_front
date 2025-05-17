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

import '../../assets/tasksStyle.css';

interface Props {
  task: TaskData;
  onEdit?: () => void;
  onToggleDone?: () => void;
}

const Task = ({ task, onEdit, onToggleDone }: Props) => {
  const pointsBgColor = getPointsBackgroundColor(task.points);

  const listItemClasses = ['task-list-item'];
  if (task.completed) listItemClasses.push('completed');

  return (
    <>
      <ListItem
        disableGutters
        className={listItemClasses.join(' ')}
      >
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={onToggleDone}
          disabled={task.completed || onToggleDone === undefined}
          size="small"
          className="task-checkbox"
        />

        <ListItemText
          primary={
            <Stack className="task-title-stack">
              <Typography className="task-title-text">
                {task.title}
              </Typography>

              <Typography
                color="text.secondary"
                className="task-points"
                style={{ '--points-bg-color': pointsBgColor } as React.CSSProperties}
              >
                {task.points} pts
                {task.points < task.start_points && (
                  <ArrowDownwardIcon fontSize="inherit" className="task-points-arrow-down" />
                )}
              </Typography>
            </Stack>
          }
        />

        {onEdit && (
          <IconButton
            edge="end"
            onClick={onEdit}
            className="task-list-edit-button"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </ListItem>

      <Divider className="task-divider" />
    </>
  );
};

export default Task;
