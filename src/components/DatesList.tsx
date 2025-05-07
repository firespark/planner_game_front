import { Typography } from '@mui/material';

type Props = {
  projectId: string;
  dates: string[];
};

const DatesList: React.FC<Props> = ({ projectId, dates }) => {
  return (
    <>
      <Typography variant="h5">Dates for Project {projectId}</Typography>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </>
  );
};

export default DatesList;
