import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Layout/Header';
import ProjectCreatePage from './pages/ProjectCreatePage';
import ProjectDetails from './pages/ProjectDetails';
import ProjectsPage from './pages/ProjectsPage';
import ProjectEditPage from './pages/ProjectEditPage';
import NotFoundPage from './pages/NotFoundPage';

// создаём тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#19b8d2',
      contrastText: '#ffffff',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth={false} sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/project/create" element={<ProjectCreatePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/edit/:id" element={<ProjectEditPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
