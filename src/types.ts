export interface ProjectData {
    id: number;
    title: string;
    start_date: string;
    segment_length: number;
    total_segments: number;
    minimum_percentage: number;
    total_points: number;
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
    points: number;
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