import Work from './components/Work';
import Home from './components/Home';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Projects from './components/Projects';
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