import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SegmentData, ProjectData } from '../types';
import { CircularProgress, Container } from '@mui/material';
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

  return (
    <Container style={{ marginTop: 40 }}>
      <Title title={project.title} />

      <div style={{ marginBottom: 20 }}>
        <p><strong>Start Date:</strong> {project.start_date}</p>
        <p><strong>Segment Length:</strong> {project.segment_length}</p>
        <p><strong>Total Segments:</strong> {project.total_segments}</p>
        <p><strong>Minimum %:</strong> {project.minimum_percentage}</p>
        <p><strong>Total Points:</strong> {project.total_points}</p>
      </div>

      {projectId !== null && segments.length > 0 && (
        <SegmentList segments={segments} project_id={projectId} />
      )}
    </Container>
  );
};

export default ProjectDetails;
