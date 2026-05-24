import { Link } from 'react-router-dom';
import styles from './component-styles/HomeNav.module.css';

function HomeNav() {
    return (
        <nav className={styles.homeNav} aria-label="Home navigation">
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
