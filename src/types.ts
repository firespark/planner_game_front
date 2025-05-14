export interface ProjectData {
  id: number;
  title: string;
  start_date: string;
  segment_length: number;
  total_segments: number;
  minimum_percentage: number;
  total_points: number;
  end_date: string;
  max_points: number;
  finished: boolean;
}

export interface ProjectFormData {
  title: string;
  start_date: string;
  segment_length: number;
  total_segments: number;
  minimum_percentage: number;
}

export interface TaskData {
  id: number;
  title: string;
  completed: boolean;
  start_points: number;
  points: number;
  date: string;
}

export interface SlotData {
  date: string;
  tasks: TaskData[];
}

export interface SegmentData {
  id: number;
  type: 'past' | 'current' | 'future';
  slots: SlotData[];
}