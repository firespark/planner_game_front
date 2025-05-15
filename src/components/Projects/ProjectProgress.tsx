import { getBarColor } from '../../helpers/styleHelpers';

import {
  Typography,
  LinearProgress
} from '@mui/material';

interface Props {
  totalPoints: number;
  maxPoints: number;
  minimumPercentage: number;
}

const ProjectProgress = ({ totalPoints, maxPoints, minimumPercentage }: Props) => {

  const percentage = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100);
  const barColor = getBarColor(percentage);

  return (
    <div>


      <div style={{ marginTop: 12 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: barColor,
            },
          }}
        />
        <Typography variant="body2" style={{ marginTop: 4 }}>
          {totalPoints} / {maxPoints} points ({percentage}% / {minimumPercentage}%)
        </Typography>
      </div>

    </div>
  );
};

export default ProjectProgress;
