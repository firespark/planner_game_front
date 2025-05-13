import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SegmentData, ProjectData } from '../types';
import {
  CircularProgress,
  Typography,
  LinearProgress
} from '@mui/material';
import Title from '../components/Layout/Title';
import SegmentList from '../components/Segments/SegmentList';

const ProjectDetails = () => {
  const { id } = useParams();
  const projectId = id ? parseInt(id, 10) : null;

  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/dates`);
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
        setProject(data.project);
        setSegments(data.segments);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !project) {
    return <p>{error || 'Project not found'}</p>;
  }

  const { total_points, max_points, minimum_percentage } = project;
  const percentage = max_points === 0 ? 0 : Math.round((total_points / max_points) * 100);

  const getBarColor = (percent: number): string => {
    if (percent < 20) return '#f44336';       // red
    if (percent < 50) return '#ff9800';       // orange/yellow
    if (percent < 80) return '#2196f3';       // blue
    if (percent < 100) return '#a5d6a7';      // light green
    return '#2e7d32';                         // dark green
  };

  const barColor = getBarColor(percentage);

  return (
    <div style={{ marginTop: 40 }}>
      <Title title={project.title} />

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

      <div style={{ marginBottom: 20 }}>
        <p>Period: <strong>{project.start_date} - {project.end_date}</strong></p>
      </div>

      {projectId !== null && segments.length > 0 && (
        <SegmentList segments={segments} project_id={projectId} />
      )}
    </div>
  );
};

export default ProjectDetails;
