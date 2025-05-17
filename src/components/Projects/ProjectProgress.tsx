import { getBarColor } from '../../helpers/styleHelpers';
import { Typography, LinearProgress } from '@mui/material';
import '../../assets/projectsStyle.css';

interface Props {
  totalPoints: number;
  maxPoints: number;
  minimumPercentage: number;
}

const ProjectProgress = ({ totalPoints, maxPoints, minimumPercentage }: Props) => {
  const percentage = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100);
  const barColor = getBarColor(percentage);

  return (
    <div className="project-progress-container">
      <LinearProgress
        variant="determinate"
        value={percentage}
        className="project-progress-bar"
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: barColor,
          },
        }}
      />
      <Typography className="project-progress-text">
        {totalPoints} / {maxPoints} points ({percentage}% / {minimumPercentage}%)
      </Typography>
    </div>
  );
};

export default ProjectProgress;
