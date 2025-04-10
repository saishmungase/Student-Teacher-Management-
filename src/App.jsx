import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './register/registeration';
import GHRCEMLearning from './ghrcemLearning';
import Login from './login/login';
import UploadMaterial from './upload-material/material';
import DoubtsPage from './doubt-page/doubt-page';
import QuizPage from './quize/quize-page';
import CreateQuiz from './create-quize/create-quiz';
import TakeQuiz from './quize/take-quize';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GHRCEMLearning />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-material" element={<UploadMaterial />} />
        <Route path="/doubts" element={<DoubtsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/edit-quiz/:quizId" element={<CreateQuiz />} />
        <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
