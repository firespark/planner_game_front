import { useState } from 'react';
import { SegmentData } from '../../types';
import Segment from './Segment';

interface Props {
  segments: SegmentData[];
}

const SegmentList = ({ segments }: Props) => {
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
        />
      ))}
    </div>
  );
};

export default SegmentList;