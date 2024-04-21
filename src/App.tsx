import { PaginationProvider } from './contexts/PaginationContext';
import MediaDetails from './pages/MediaDetails';
import Medias from './pages/Medias';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <PaginationProvider>
        <Routes>
          <Route path="/" element={<Medias />} />
          <Route path="/medias/:imdbId" element={<MediaDetails />} />
          <Route path="*" element={<Navigate to={'/'} replace />} />
        </Routes>
      </PaginationProvider>
    </Router>
  );
};

export default App;
