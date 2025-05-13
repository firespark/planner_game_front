import { Paper, Typography, LinearProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProjectData } from '../../types';
import { getColorByPercentage } from '../../helpers/styleHelpers';

const ProjectCard = ({
  id,
  title,
  start_date,
  total_points,
  end_date,
  max_points,
  minimum_percentage
}: ProjectData) => {
  const navigate = useNavigate();
  const percentage = max_points > 0 ? Math.round((total_points / max_points) * 100) : 0;
  const barColor = getColorByPercentage(percentage);

  return (
    <Paper style={{ padding: 20 }}>
      <Typography
        variant="h4"
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => navigate(`/project/${id}`)}
      >
        {title}
      </Typography>
      <Typography color="textSecondary">
        {start_date} - {end_date}
      </Typography>

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
          {total_points} / {max_points} points ({percentage}% / {minimum_percentage}%)
        </Typography>
      </div>

      <Button
        variant="outlined"
        style={{ marginTop: 12 }}
        onClick={() => navigate(`/project/edit/${id}`)}
      >
        Edit
      </Button>
    </Paper>
  );
};

export default ProjectCard;
