import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './register/registeration';
import GHRCEMLearning from './ghrcemLearning';
import Login from './login/login';
import UploadMaterial from './upload-material/material';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GHRCEMLearning />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-material" element={<UploadMaterial />} />
      </Routes>
    </Router>
  );
}

export default App;
