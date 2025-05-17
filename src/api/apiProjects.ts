import { ProjectFormData, ProjectData, SegmentData } from '../types';
import { handleError } from '../helpers/errorHelpers';


export async function fetchProjects(): Promise<ProjectData[]> {
  const response = await fetch('/api/projects');
  const data = await response.json();

  if (!response.ok || !Array.isArray(data)) {
    handleError(response, data, 'Failed to fetch projects');
  }

  return data;
}

export async function fetchProjectDetails(projectId: number): Promise<{
  project: ProjectData;
  segments: SegmentData[];
}> {
  const response = await fetch(`/api/projects/${projectId}/dates`);
  const data = await response.json();

  if (!response.ok || !data?.project || !Array.isArray(data?.segments)) {
    handleError(response, data, 'Failed to fetch project data');
  }

  return {
    project: data.project,
    segments: data.segments,
  };
}

export async function fetchProject(id: string): Promise<ProjectFormData> {
  const response = await fetch(`/api/projects/${id}`);
  const data = await response.json();

  if (!response.ok || !data.success || !data.project) {
    handleError(response, data, 'Failed to load project');
  }

  return data.project;
}

export async function fetchUpdateProject(id: string, title: string): Promise<void> {
  const response = await fetch(`/api/projects/update/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    handleError(response, data, 'Failed to update the project');
  }
}

export async function fetchDeleteProject(id: string): Promise<void> {
  const response = await fetch(`/api/projects/delete/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    handleError(response, data, 'Failed to delete the project');
  }
}

export async function fetchCreateProject(data: ProjectFormData): Promise<number> {
  const response = await fetch('/api/projects/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success || !result.project_id) {
    handleError(response, result, 'Failed to create the project');
  }

  return result.project_id;
}
