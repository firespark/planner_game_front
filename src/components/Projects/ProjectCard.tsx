import {
  Paper,
  Typography,
  LinearProgress,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProjectData } from '../../types';
import { getColorByPercentage } from '../../helpers/styleHelpers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../../assets/style.css';

const ProjectCard = ({
  id,
  title,
  start_date,
  total_points,
  end_date,
  max_points,
  minimum_percentage,
  finished
}: ProjectData) => {
  const navigate = useNavigate();
  const percentage = max_points > 0 ? Math.round((total_points / max_points) * 100) : 0;
  const barColor = getColorByPercentage(percentage);

  const completedEnough = finished ? percentage >= 70 : percentage >= minimum_percentage;

  const activeColor = '#19b8d2';

  return (
    <Paper className={`project-card ${finished ? 'finished' : ''} ${completedEnough ? 'completed-enough' : ''}`}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h4"
          className="project-title"
          onClick={() => navigate(`/project/${id}`)}
        >
          {title}
        </Typography>

        {finished ? (
          completedEnough ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon sx={{ fontSize: 20, color: 'gray' }} />
          )
        ) : (
          <AddCircleIcon sx={{ fontSize: 20, color: activeColor }} />
        )}
      </Box>

      <Typography className="project-dates">
        {start_date} – {end_date}
      </Typography>

      <Box mt={2}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: barColor
            }
          }}
        />
        <Typography className="progress-text" variant="body2" mt={1}>
          {total_points} / {max_points} points ({percentage}% / {minimum_percentage}%)
        </Typography>
      </Box>

      <Button
        className="edit-button"
        variant="outlined"
        onClick={() => navigate(`/project/edit/${id}`)}
      >
        Edit
      </Button>
    </Paper>
  );
};

export default ProjectCard;
