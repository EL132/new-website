import { Link } from 'react-router-dom';
import styles from './component-styles/HomeNav.module.css';

function HomeNav({ variant = 'default' }) {
    const variantClassName = {
        travel: styles.travelNav,
        dark: styles.darkNav,
    }[variant];
    const navClassName = variantClassName
        ? `${styles.homeNav} ${variantClassName}`
        : styles.homeNav;

    return (
        <nav className={navClassName} aria-label="Home navigation">
            <Link
                to="/"
                className={styles.homeLink}
                data-umami-event="navigation-click"
                data-umami-event-destination="/"
                data-umami-event-element="home-logo"
            >
                <picture className={styles.homePicture}>
                    <source media="(max-width: 768px)" srcSet="/pixelated-image-128.png" />
                    <img
                        src="/pixelated-image.png"
                        alt="Go home"
                        className={styles.homeImage}
                    />
                </picture>
            </Link>
        </nav>
    );
}

export default HomeNav;
