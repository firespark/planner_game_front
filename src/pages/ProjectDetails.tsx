import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SegmentData, ProjectData } from '../types';
import { getBarColor } from '../helpers/styleHelpers';
import { useProjectContext } from '../context/ProjectContext';
import { fetchProjectDetails } from '../api/apiProjects';

import {
  CircularProgress,
  Typography,
  LinearProgress
} from '@mui/material';

import Title from '../components/Layout/Title';
import SegmentList from '../components/Segments/SegmentList';

const ProjectDetails = () => {
  const { maxPoints, setMaxPoints, setTotalPoints, totalPoints } = useProjectContext();

  const { id } = useParams();
  const projectId = id ? parseInt(id, 10) : null;

  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current || !projectId) return;
    fetchedRef.current = true;

    const loadData = async () => {
      try {
        const data = await fetchProjectDetails(projectId);
        setProject(data.project);
        setSegments(data.segments);
        setMaxPoints(data.project.max_points);
        setTotalPoints(data.project.total_points);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [projectId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !project) {
    return <p>{error || 'Project not found'}</p>;
  }

  const { minimum_percentage } = project;
  const percentage = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100);
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
          {totalPoints} / {maxPoints} points ({percentage}% / {minimum_percentage}%)
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
