import Work from './pages/Work';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work" element={<Work />} />
        </Routes>
    );
}

export default App;