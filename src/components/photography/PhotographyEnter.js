import { motion } from 'react-magic-motion';
import { Link } from 'react-router-dom';
import styles from '../../pages/styles/Photography.module.css';

function PhotographyEnter({ onEnter, shouldReduceMotion }) {
    const transition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

    return (
        <motion.main
            className={styles.enterShell}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={transition}
        >
            <Link className={styles.enterHomeLink} to="/" aria-label="Go home">
                <picture>
                    <source media="(max-width: 768px)" srcSet="/pixelated-image-128.png" />
                    <img src="/pixelated-image.png" alt="" className={styles.enterHomeImage} />
                </picture>
            </Link>

            <div className={styles.enterContent}>
                <p className={styles.enterKicker}>photography</p>
                <button className={styles.enterButton} type="button" onClick={onEnter}>
                    enter
                </button>
            </div>
        </motion.main>
    );
}

export default PhotographyEnter;
