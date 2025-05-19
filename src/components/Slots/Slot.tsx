import { Paper, Typography } from '@mui/material';
import { SlotData, TaskData } from '../../types';
import { parseLocalDate } from '../../helpers/dateHelpers';
import TaskList from '../Tasks/TaskList';
import { getTodayBoxShadowClass } from '../../helpers/styleHelpers';

import '../../assets/slotsStyle.css';

interface Props {
  slot: SlotData;
  project_id: number;
  onTaskUpdate: (task: TaskData) => void;
  onTaskCreate: (task: TaskData) => void;
}

const Slot = ({ slot, project_id, onTaskUpdate, onTaskCreate }: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const slotDate = parseLocalDate(slot.date);

  const isPast = slotDate < today;
  const isToday = slotDate.getTime() === today.getTime();

  const paperClassName = [
    'slot-paper',
    isPast ? 'past' : '',
    getTodayBoxShadowClass(isToday),
  ].filter(Boolean).join(' ');

  return (
    <Paper variant="outlined" className={paperClassName}>
      <Typography className="slot-date">
        {slot.date}
      </Typography>

      <TaskList
        tasks={slot.tasks}
        date={slot.date}
        project_id={project_id}
        isPast={isPast}
        isToday={isToday}
        onTaskUpdate={onTaskUpdate}
        onTaskCreate={onTaskCreate}
      />
    </Paper>
  );
};

export default Slot;
