import styles from './TravelStats.module.css';

function TravelStats({ totalFlights, uniqueAirports, uniqueRoutes }) {
    return (
        <aside className={styles.statsCard} aria-label="Travel stats">
            <div>
                <span className={styles.statValue}>{totalFlights}</span>
                <span className={styles.statLabel}>flights rendered</span>
            </div>
            <div>
                <span className={styles.statValue}>{uniqueAirports}</span>
                <span className={styles.statLabel}>unique airports</span>
            </div>
            <div>
                <span className={styles.statValue}>{uniqueRoutes}</span>
                <span className={styles.statLabel}>unique routes</span>
            </div>
        </aside>
    );
}

export default TravelStats;
