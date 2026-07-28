import { useEffect, useMemo, useRef, useState } from 'react';
import FlightGlobe from '../components/travel/FlightGlobe';
import TravelStats from '../components/travel/TravelStats';
import AirportSecurityWaitTimes from '../components/travel/AirportSecurityWaitTimes';
import {
    buildFlightArcs,
    getUniqueAirports,
    getUniqueRoutesCount,
    parseFlightsCsv,
} from '../utils/flightData';
import styles from './styles/Travel.module.css';

function Travel() {
    const [arcs, setArcs] = useState([]);
    const [skippedFlights, setSkippedFlights] = useState([]);
    const [status, setStatus] = useState('loading');
    const loggedWarningsRef = useRef(new Set());

    useEffect(() => {
        document.title = 'Travel';
    }, []);

    useEffect(() => {
        let isCancelled = false;

        fetch('/flight_history_routes.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Unable to load flight CSV: ${response.status}`);
                }
                return response.text();
            })
            .then(csvText => {
                if (isCancelled) return;

                const flights = parseFlightsCsv(csvText);
                const { arcs: validArcs, skipped } = buildFlightArcs(flights);

                setArcs(validArcs);
                setSkippedFlights(skipped);
                setStatus('ready');
            })
            .catch(error => {
                if (isCancelled) return;

                setStatus('error');
                if (process.env.NODE_ENV === 'development') {
                    console.warn(error.message);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        skippedFlights.forEach(skipped => {
            const key = `${skipped.id}-${skipped.reason}-${skipped.codes.join('-')}`;
            if (loggedWarningsRef.current.has(key)) return;

            loggedWarningsRef.current.add(key);
            console.warn(`Skipping flight ${skipped.id}: ${skipped.reason}${skipped.codes.length ? ` (${skipped.codes.join(', ')})` : ''}`);
        });
    }, [skippedFlights]);

    const airports = useMemo(() => getUniqueAirports(arcs), [arcs]);
    const uniqueRoutes = useMemo(() => getUniqueRoutesCount(arcs), [arcs]);

    return (
        <main className={styles.travelPage}>
            <section className={styles.hero}>
                <p className={styles.eyebrow}>travel log</p>
                <h1>Flights I&apos;ve Taken</h1>
                <p className={styles.subtitle}>
                    A map of my travel history since 2022 
                </p>
            </section>

            <section className={styles.globePanel} aria-label="Flight history globe">
                <div className={styles.statsOverlay}>
                    <TravelStats
                        totalFlights={arcs.length}
                        uniqueAirports={airports.length}
                        uniqueRoutes={uniqueRoutes}
                    />
                </div>

                {status === 'error' ? (
                    <div className={styles.statusMessage}>
                        Unable to load flight history.
                    </div>
                ) : (
                    <>
                        <FlightGlobe arcs={arcs} airports={airports} />
                        {status === 'loading' && (
                            <div className={styles.statusMessage}>
                                Loading flight paths...
                            </div>
                        )}
                    </>
                )}
            </section>

            <AirportSecurityWaitTimes />
        </main>
    );
}

export default Travel;
