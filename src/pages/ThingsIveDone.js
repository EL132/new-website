import { useEffect } from 'react';
import ThingsShowcase from '../components/things/ThingsShowcase';
import { thingsIveDoneItems } from '../data/thingsIveDone';
import styles from './styles/ThingsIveDone.module.css';

function ThingsIveDone() {
    useEffect(() => {
        document.title = "Things I've Done";
    }, []);

    return (
        <main className={styles.thingsPage}>
            <header className={styles.pageHeader}>
                <p className={styles.eyebrow}>friend</p>
                <h1>things i've done</h1>
            </header>

            <ThingsShowcase items={thingsIveDoneItems} />
        </main>
    );
}

export default ThingsIveDone;
