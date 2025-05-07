import { Paper, Typography, Box, Grid } from '@mui/material';
import { SegmentData } from '../../types';
import Slot from '../Slots/Slot';

interface Props {
  segment: SegmentData;
  isActive: boolean;
  onActivate: () => void;
}

const Segment = ({ segment, isActive, onActivate }: Props) => {
  const colorMap = {
    past: '#e0e0e0',
    current: '#1976d2',
    future: '#b3e5fc',
  };

  return (
    <Paper
      onClick={onActivate}
      sx={{
        p: 2,
        backgroundColor: colorMap[segment.type],
        cursor: 'pointer',
        mb: 2,
      }}
    >
      <Typography variant="h6" color={segment.type === 'past' ? 'textSecondary' : 'white'}>
        Segment #{segment.id}
      </Typography>

      {isActive && (
        <Box mt={2}>
          <Grid container spacing={2}>
            {segment.slots.map((slot, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Slot slot={slot} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default Segment;
