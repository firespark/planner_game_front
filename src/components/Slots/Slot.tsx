import { Paper, Typography } from '@mui/material';
import { SlotData } from '../../types';
import { parseLocalDate } from '../../helpers/dateHelpers';
import TaskList from '../Tasks/TaskList';

interface Props {
  slot: SlotData;
  project_id: number;
}

const Slot = ({ slot, project_id }: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const slotDate = parseLocalDate(slot.date);

  const isPast = slotDate < today;
  const isToday = slotDate.getTime() === today.getTime();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        backgroundColor: isPast ? '#e0e0e0' : '#f3f3f3',
        opacity: isPast ? 0.5 : 1,
        boxShadow: isToday
          ? '0 0 8px 2px rgba(0, 128, 0, 0.7)'
          : undefined,
      }}
    >
      <Typography
        sx={{
          fontSize: '1rem',
          color: '#8c8282',
          fontWeight: 600,
        }}
      >
        {slot.date}
      </Typography>


      <TaskList
        tasks={slot.tasks}
        date={slot.date}
        project_id={project_id}
        isPast={isPast}
        isToday={isToday}
      />
    </Paper>
  );
};

export default Slot;
