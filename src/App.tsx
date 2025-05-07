import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectCreatePage from './pages/ProjectCreatePage';
import ProjectDetails from './pages/ProjectDetails';

const App = () => {
  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <Routes>
          <Route path="/" element={<ProjectCreatePage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
