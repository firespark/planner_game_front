import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth={false} sx={{ maxWidth: 1400 }}>
        <Toolbar disableGutters>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: '40px' }}
              />
            </Box>
            <Typography variant="h6" component="div">
              Planner
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Button color="inherit" component={Link} to="/">
              Projects
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
