import React, { createContext, useContext, useState } from 'react';

interface ProjectContextProps {
  maxPoints: number;
  setMaxPoints: (value: number) => void;
  totalPoints: number;
  setTotalPoints: (value: number) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [maxPoints, setMaxPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  return (
    <ProjectContext.Provider value={{ maxPoints, setMaxPoints, totalPoints, setTotalPoints }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
