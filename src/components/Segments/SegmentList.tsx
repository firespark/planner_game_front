import { useState } from 'react';
import { SegmentData, TaskData } from '../../types';
import Segment from './Segment';

interface Props {
  segments: SegmentData[];
  project_id: number;
  onTaskUpdate: (task: TaskData) => void;
  onTaskCreate: (task: TaskData) => void;
}

const SegmentList = ({ segments, project_id, onTaskUpdate, onTaskCreate }: Props) => {
  const [activeId, setActiveId] = useState<number>(
    segments.find((s) => s.type === 'current')?.id || segments[0].id
  );

  return (
    <div>
      {segments.map((segment) => (
        <Segment
          key={segment.id}
          segment={segment}
          isActive={segment.id === activeId}
          onActivate={() => setActiveId(segment.id)}
          project_id={project_id}
          onTaskUpdate={onTaskUpdate}
          onTaskCreate={onTaskCreate}
        />
      ))}
    </div>
  );
};

export default SegmentList;