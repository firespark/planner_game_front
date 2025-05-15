import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SegmentData, ProjectData } from '../types';
import { useProjectContext } from '../context/ProjectContext';
import { fetchProjectDetails } from '../api/apiProjects';

import { CircularProgress } from '@mui/material';

import Title from '../components/Layout/Title';
import ProjectProgress from '../components/Projects/ProjectProgress';
import SegmentList from '../components/Segments/SegmentList';
import ProjectDates from '../components/Projects/ProjectDates';

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


  return (
    <div style={{ marginTop: 40 }}>
      <Title title={project.title} />

      {projectId !== null && segments.length > 0 && (
        <>
          <ProjectProgress totalPoints={totalPoints} maxPoints={maxPoints} minimumPercentage={project.minimum_percentage} />
          <ProjectDates startDate={project.start_date} endDate={project.end_date} />
          <SegmentList segments={segments} project_id={projectId} />
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
