import { Typography } from '@mui/material';

interface Props {
  title: string;
}

const Title = ({ title }: Props) => (
  <Typography variant="h4" gutterBottom>
    {title}
  </Typography>
);

export default Title;
