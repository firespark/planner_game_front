import { Stack } from '@mui/material';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../types';

type Props = {
  projects: ProjectData[];
};

const ProjectList = ({ projects }: Props) => {
  return (
    <Stack spacing={3}>
      {projects.length === 0
        ? null
        : projects.map((project) => <ProjectCard key={project.id} {...project} />)}
    </Stack>
  );
};

export default ProjectList;
