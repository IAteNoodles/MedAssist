
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import DashboardPage from './pages/DashboardPage';
import Consultation from './pages/Consultation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/consultation" element={<Consultation />} />
      </Routes>
    </Router>
  );
}

export default App;


