import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Layout/Header';
import ProjectCreatePage from './pages/ProjectCreatePage';
import ProjectDetails from './pages/ProjectDetails';
import ProjectsPage from './pages/ProjectsPage';
import ProjectEditPage from './pages/ProjectEditPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { ProjectProvider } from './context/ProjectContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#19b8d2',
      contrastText: '#ffffff',
    },
  },
});

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <ProjectsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/project/create"
        element={isAuthenticated ? <ProjectCreatePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/project/:id"
        element={isAuthenticated ? <ProjectDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/project/edit/:id"
        element={isAuthenticated ? <ProjectEditPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ProjectProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Container maxWidth={false} sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
              <AppRoutes />
            </Container>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ProjectProvider>
  );
};

export default App;
