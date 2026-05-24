import { Link } from 'react-router-dom';
import styles from './component-styles/HomeNav.module.css';

function HomeNav({ variant = 'default' }) {
    const navClassName = variant === 'travel'
        ? `${styles.homeNav} ${styles.travelNav}`
        : styles.homeNav;

    return (
        <nav className={navClassName} aria-label="Home navigation">
            <Link to="/" className={styles.homeLink}>
                <img
                    src="/pixelated-image.png"
                    alt="Go home"
                    className={styles.homeImage}
                />
            </Link>
        </nav>
    );
}

export default HomeNav;
