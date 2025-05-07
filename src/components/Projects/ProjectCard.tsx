import { Paper, Typography, LinearProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  total_points: number;
  max_points: number;
}

const ProjectCard = ({
  id,
  title,
  start_date,
  end_date,
  total_points,
  max_points,
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const percentage = Math.round((total_points / max_points) * 100);

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
        {start_date} - {end_date}
      </Typography>

      <div style={{ marginTop: 12 }}>
        <LinearProgress variant="determinate" value={percentage} />
        <Typography variant="body2" style={{ marginTop: 4 }}>
          {total_points} / {max_points} points
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
