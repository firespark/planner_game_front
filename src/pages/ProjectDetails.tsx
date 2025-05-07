import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, CircularProgress } from '@mui/material';
import SegmentDatesList from '../components/DatesList';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const [segmentDates, setSegmentDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects/dates')
      .then(res => res.json())
      .then(data => {
        setSegmentDates(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Paper style={{ padding: 24 }}>
      {id && <SegmentDatesList projectId={id} dates={segmentDates} />}
    </Paper>
  );
};

export default ProjectDetails;
