import Work from './pages/Work';
import Home from './pages/Home';
import Writing from './pages/Writing';
import BlogPost from './components/BlogPost';
import BridgeQuiz from './components/BridgeQuiz';
import Projects from './pages/Projects';
import Angelica from './pages/Angelica';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


function App() {
    // function to wake up free-instance backend 
    useEffect(() => {
            fetch("https://new-website-backend-j4bh.onrender.com/")
                .then(() => console.log("Backend pinged"))
                .catch(() => console.log("Backend not reachable"));
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/blog/:id" element={<BlogPost />} />
            <Route path="/work" element={<Work />} />
            <Route path="/bridge-quiz" element={<BridgeQuiz />} />
            <Route path="/211" element={<Angelica />} />
        </Routes>
    );
}

export default App;