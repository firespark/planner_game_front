import { Paper, Typography } from '@mui/material';
import { SlotData } from '../../types';
import TaskList from '../Tasks/TaskList';

interface Props {
  slot: SlotData;
}

const Slot = ({ slot }: Props) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Typography variant="subtitle2">{slot.date}</Typography>
    <TaskList tasks={slot.tasks} />
  </Paper>
);

export default Slot;
