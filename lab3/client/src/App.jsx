import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/Home';
import ConvertVideo from './components/Convert';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/convert" element={<ConvertVideo />} />
          <Route path="/" element={<HomePage />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
