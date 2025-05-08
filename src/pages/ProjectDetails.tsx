import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SegmentData } from '../types';
import { CircularProgress, Container } from '@mui/material';
import Title from '../components/Layout/Title';
import SegmentList from '../components/Segments/SegmentList';

const ProjectDetails = () => {
  const { id } = useParams();
  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await fetch(`/api/projects/${id}/dates`);
        if (!response.ok) {
          throw new Error('Failed to fetch segments');
        }

        const data = await response.json();
        setSegments(data);
      } catch (err) {
        setError('Failed to load segments');
      } finally {
        setLoading(false);
      }
    };

    fetchSegments();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Project" />
      {segments.length === 0 ? (
        null
      ) : (
        <SegmentList segments={segments} />
      )}
    </Container>
  );
};

export default ProjectDetails;
