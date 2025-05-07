import { Stack } from '@mui/material';
import ProjectCard from './ProjectCard';

const dummyProjects = [
  {
    id: 1,
    title: 'Project A',
    start_date: '2025-05-01',
    end_date: '2025-06-01',
    total_points: 90,
    max_points: 100,
  },
  {
    id: 2,
    title: 'Project B',
    start_date: '2025-05-07',
    end_date: '2025-07-01',
    total_points: 45,
    max_points: 60,
  },
];

const ProjectList = () => {
  return (
    <Stack spacing={3}>
      {dummyProjects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </Stack>
  );
};

export default ProjectList;
