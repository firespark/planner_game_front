interface Props {
  startDate: string;
  endDate: string;
}

const ProjectDates = ({ startDate, endDate }: Props) => {

  return (
    <div style={{ marginBottom: 20 }}>
      <p>Period: <strong>{startDate} - {endDate}</strong></p>
    </div>
  );
};

export default ProjectDates;
