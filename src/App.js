import Home from './pages/Home';
import About from './pages/About';
import Photography from './pages/Photography';
import Travel from './pages/Travel';
import MakingThings from './pages/MakingThings';
import Education from './pages/Education';
import EducationThought from './pages/EducationThought';
import ThingsIveDone from './pages/ThingsIveDone';
import Birthday from './pages/Birthday';
import TripOptions from './pages/TripOptions';
import HomeNav from './components/HomeNav';
import { Routes, Route, useLocation } from 'react-router-dom';


function App() {
    const location = useLocation();
    const isPhotographyPage = location.pathname === '/artist/photography';
    const isBirthdayPage = location.pathname.startsWith('/birthday');
    const showHomeNav = location.pathname !== '/' && !isPhotographyPage && !isBirthdayPage;
    const homeNavVariant = location.pathname === '/engineer/making-things' ? 'dark' : 'default';

    return (
        <>
            {showHomeNav && <HomeNav variant={homeNavVariant} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/artist/photography" element={<Photography />} />
                <Route path="/artist/travel" element={<Travel />} />
                <Route path="/engineer/making-things" element={<MakingThings />} />
                <Route path="/engineer/education" element={<Education />} />
                <Route path="/engineer/education/thoughts/:slug" element={<EducationThought />} />
                <Route path="/friend/things-ive-done" element={<ThingsIveDone />} />
                <Route path="/birthday" element={<Birthday />} />
                <Route path="/birthday/options" element={<TripOptions />} />
            </Routes>
        </>
    );
}

export default App;
