import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Prompt from './pages/Prompt';
import Genre from './pages/Genre';
import Instrument from './pages/Instrument';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text_to_music" element={<Prompt />} />
          <Route path="/genre_to_music" element={<Genre />} />
          <Route path="/instrument_to_music" element={<Instrument />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
