import { Paper, Typography, Box } from '@mui/material';
import { SegmentData, TaskData } from '../../types';
import Slot from '../Slots/Slot';
import { getSegmentColor } from '../../helpers/styleHelpers';

import '../../assets/segmentsStyle.css';

interface Props {
  segment: SegmentData;
  project_id: number;
  isActive: boolean;
  onActivate: () => void;
  onTaskUpdate: (task: TaskData) => void;
  onTaskCreate: (task: TaskData) => void;
}

const Segment = ({ segment, project_id, isActive, onActivate, onTaskUpdate, onTaskCreate }: Props) => {
  const backgroundColor = getSegmentColor(segment.type);

  return (
    <Paper
      onClick={onActivate}
      className="segment-paper"
      style={{ backgroundColor }}
      elevation={1}
      sx={{ border: 'none' }}
    >
      <Typography variant="h6" className="segment-title">
        Part {segment.id}
      </Typography>

      {isActive && (
        <Box className="slots-container">
          {segment.slots.map((slot, index) => (
            <Box key={index} className="slot-wrapper">
              <Slot
                slot={slot}
                project_id={project_id}
                onTaskUpdate={onTaskUpdate}
                onTaskCreate={onTaskCreate}
              />
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default Segment;
