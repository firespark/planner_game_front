import { Paper, Typography, Box, Grid } from '@mui/material';
import { SegmentData } from '../../types';
import Slot from '../Slots/Slot';

interface Props {
  segment: SegmentData;
  project_id: number;
  isActive: boolean;
  onActivate: () => void;
}

const Segment = ({ segment, project_id, isActive, onActivate }: Props) => {
  const colorMap = {
    past: '#cfd9e3',
    current: '#19b8d2',
    future: '#98d0b9',
  };

  return (
    <Paper
      onClick={onActivate}
      sx={{
        p: 2,
        backgroundColor: colorMap[segment.type],
        mb: 2,
      }}
    >
      <Typography
        variant="h6"
        color="white"
        sx={{ width: '100%', cursor: 'pointer' }}
      >
        Part {segment.id}
      </Typography>


      {isActive && (
        <Box mt={2}>
          <Grid container spacing={2}>
            {segment.slots.map((slot, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Slot slot={slot} project_id={project_id} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default Segment;
