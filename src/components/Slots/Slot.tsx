import { Paper, Typography } from '@mui/material';
import { SlotData } from '../../types';
import TaskList from '../Tasks/TaskList';

interface Props {
  slot: SlotData;
  project_id: number;
}

const Slot = ({ slot, project_id }: Props) => {
  const today = new Date(new Date().toDateString());
  const slotDate = new Date(slot.date);
  const isPast = slotDate < today;
  const isToday = slotDate.getTime() === today.getTime();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        backgroundColor: isPast ? '#e0e0e0' : '#f3f3f3',
        opacity: isPast ? 0.5 : 1,
        border: isToday ? '2px solid green' : undefined,
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
