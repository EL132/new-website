import Papa from 'papaparse';
import { airportCoordinates } from '../data/airportCoordinates';

export function parseFlightsCsv(csvText) {
    const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim(),
        transform: value => (typeof value === 'string' ? value.trim() : value),
    });

    return result.data.filter(row => row.id || row.origin_iata || row.destination_iata);
}

export function buildFlightArcs(flights, coordinates = airportCoordinates) {
    const arcs = [];
    const skipped = [];

    flights.forEach((flight, index) => {
        const id = flight.id || `${index + 1}`;
        const originCode = flight.origin_iata;
        const destinationCode = flight.destination_iata;

        if (!originCode || !destinationCode) {
            skipped.push({
                id,
                reason: 'missing origin or destination',
                codes: [originCode, destinationCode].filter(Boolean),
            });
            return;
        }

        const origin = coordinates[originCode];
        const destination = coordinates[destinationCode];

        if (!origin || !destination) {
            skipped.push({
                id,
                reason: 'missing airport coordinates',
                codes: [!origin ? originCode : null, !destination ? destinationCode : null].filter(Boolean),
            });
            return;
        }

        const route = `${originCode}-${destinationCode}`;
        arcs.push({
            id,
            date: flight.date,
            route,
            originCode,
            destinationCode,
            startLat: origin.lat,
            startLng: origin.lng,
            endLat: destination.lat,
            endLng: destination.lng,
            label: `${originCode} \u2192 ${destinationCode} \u00b7 ${formatFlightDate(flight.date)}`,
            altitude: getArcAltitude(origin, destination),
        });
    });

    return { arcs, skipped };
}

export function getUniqueAirports(arcs, coordinates = airportCoordinates) {
    const airportCounts = new Map();

    arcs.forEach(arc => {
        airportCounts.set(arc.originCode, (airportCounts.get(arc.originCode) || 0) + 1);
        airportCounts.set(arc.destinationCode, (airportCounts.get(arc.destinationCode) || 0) + 1);
    });

    return Array.from(airportCounts.keys()).sort().map(code => ({
        code,
        ...coordinates[code],
        flightCount: airportCounts.get(code),
        label: `${code} \u00b7 ${coordinates[code].label}`,
    }));
}

export function getUniqueRoutesCount(arcs) {
    return new Set(arcs.map(arc => arc.route)).size;
}

function formatFlightDate(date) {
    if (!date) return 'unknown date';

    const parts = date.split('/');
    if (parts.length !== 3) return date;

    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function getArcAltitude(origin, destination) {
    const latDistance = Math.abs(origin.lat - destination.lat);
    const lngDistance = Math.abs(origin.lng - destination.lng);
    const roughDistance = Math.sqrt(latDistance ** 2 + lngDistance ** 2);

    return Math.min(0.55, Math.max(0.16, roughDistance / 260));
}
