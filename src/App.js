import Work from './pages/Work';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Projects from './pages/Projects';
import Angelica from './pages/Angelica';
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/work" element={<Work />} />
            <Route path="/211" element={<Angelica />} />
        </Routes>
    );
}

export default App;