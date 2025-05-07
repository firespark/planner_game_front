import { Paper, Typography, LinearProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProjectData } from '../../types';

const ProjectCard = ({
  id,
  title,
  start_date,
  segment_length,
  total_segments,
  minimum_percentage,
  total_points
}: ProjectData) => {
  const navigate = useNavigate();
  //const percentage = Math.round((total_points / max_points) * 100);
  const percentage = minimum_percentage;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography
        variant="h6"
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => navigate(`/project/${id}`)}
      >
        {title}
      </Typography>
      <Typography color="textSecondary">
        {start_date}
      </Typography>

      <div style={{ marginTop: 12 }}>
        <LinearProgress variant="determinate" value={percentage} />
        <Typography variant="body2" style={{ marginTop: 4 }}>
          {total_points} / {total_points} points
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
