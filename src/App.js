import Home from './pages/Home';
import About from './pages/About';
import Photography from './pages/Photography';
import Travel from './pages/Travel';
import MakingThings from './pages/MakingThings';
import Education from './pages/Education';
import ThingsIveDone from './pages/ThingsIveDone';
import HomeNav from './components/HomeNav';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';


function App() {
    const location = useLocation();
    const showHomeNav = location.pathname !== '/';

    // function to wake up free-instance backend 
    useEffect(() => {
            fetch("https://new-website-backend-j4bh.onrender.com/")
                .then(() => console.log("Backend pinged"))
                .catch(() => console.log("Backend not reachable"));
    }, []);

    return (
        <>
            {showHomeNav && <HomeNav />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/artist/photography" element={<Photography />} />
                <Route path="/artist/travel" element={<Travel />} />
                <Route path="/engineer/making-things" element={<MakingThings />} />
                <Route path="/engineer/education" element={<Education />} />
                <Route path="/friend/things-ive-done" element={<ThingsIveDone />} />
            </Routes>
        </>
    );
}

export default App;
