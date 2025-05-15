import { ProjectFormData, ProjectData, SegmentData } from '../types';

export async function fetchProjects(): Promise<ProjectData[]> {
  const response = await fetch('/api/projects');

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}

export async function fetchProjectDetails(projectId: number): Promise<{
  project: ProjectData;
  segments: SegmentData[];
}> {
  const response = await fetch(`/api/projects/${projectId}/dates`);

  if (!response.ok) {
    throw new Error('Failed to fetch project data');
  }

  const data = await response.json();

  return {
    project: data.project,
    segments: data.segments,
  };
}

export async function fetchProject(id: string): Promise<ProjectFormData> {
  const res = await fetch(`/api/projects/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }

  const data = await res.json();

  if (data.success && data.project) {
    return data.project;
  }

  throw new Error('Failed to load project');
}

export async function fetchUpdateProject(id: string, title: string): Promise<void> {
  const res = await fetch(`/api/projects/update/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error('Failed to update project');
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error('Failed to update the project');
  }
}

export async function fetchDeleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/delete/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete project');
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error('Failed to delete the project');
  }
}

export async function fetchCreateProject(data: ProjectFormData): Promise<number> {
  const res = await fetch('/api/projects/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create project');
  }

  const result = await res.json();

  if (result.success && result.project_id) {
    return result.project_id;
  }

  throw new Error('Failed to create the project');
}
