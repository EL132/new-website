import { useEffect, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'react-magic-motion';
import PhotographyEnter from '../components/photography/PhotographyEnter';
import PhotoExplorer from '../components/photography/PhotoExplorer';
import styles from './styles/Photography.module.css';

function Photography() {
    const [hasEntered, setHasEntered] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        document.title = 'Photography';
    }, []);

    return (
        <div className={styles.photographyPage}>
            <AnimatePresence mode="wait">
                {hasEntered ? (
                    <PhotoExplorer
                        key="explorer"
                        onExit={() => setHasEntered(false)}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                ) : (
                    <PhotographyEnter
                        key="enter"
                        onEnter={() => setHasEntered(true)}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Photography;
