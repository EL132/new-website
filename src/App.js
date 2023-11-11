import Work from './pages/Work';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Projects from './pages/Projects';
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Routes>
            <Route path="/new-website/" element={<Home />} />
            <Route path="/new-website/projects" element={<Projects />} />
            <Route path="/new-website/writing" element={<Writing />} />
            <Route path="/new-website/work" element={<Work />} />
        </Routes>
    );
}

export default App;