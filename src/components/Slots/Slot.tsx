import { Paper, Typography } from '@mui/material';
import { SlotData } from '../../types';
import TaskList from '../Tasks/TaskList';

interface Props {
  slot: SlotData;
  project_id: number;
}

const Slot = ({ slot, project_id }: Props) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Typography variant="subtitle2">{slot.date}</Typography>
    <TaskList tasks={slot.tasks} date={slot.date} project_id={project_id} />
  </Paper>
);

export default Slot;
