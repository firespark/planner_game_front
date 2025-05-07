import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SegmentData } from '../types';
import { CircularProgress, Container } from '@mui/material';
import Title from '../components/Layout/Title';
import SegmentList from '../components/Segments/SegmentList';

const ProjectDetails = () => {
  const { id } = useParams();
  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const example: SegmentData[] = [
      {
        id: 1,
        type: 'past',
        slots: [
          {
            date: '2025-05-01',
            tasks: [
              { id: 1, title: 'Past Task 1', completed: true, points: 80 },
              { id: 2, title: 'Past Task 2', completed: false, points: 30 },
            ],
          },
        ],
      },
      {
        id: 2,
        type: 'current',
        slots: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return {
            date: date.toISOString().slice(0, 10),
            tasks: [
              { id: 10 + i, title: `Task ${i + 1}`, completed: false, points: 30 },
            ],
          };
        }),
      },
      {
        id: 3,
        type: 'future',
        slots: [
          {
            date: '2025-06-01',
            tasks: [],
          },
        ],
      },
    ];
    setSegments(example);
    setLoading(false);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container style={{ marginTop: 40 }}>
      <Title title="Project" />
      <SegmentList segments={segments} />
    </Container>
  );
};

export default ProjectDetails;