import { Fragment, useMemo, useState } from 'react';
import { airportSecurityWaitTimeGroups } from '../../data/airportSecurityWaitTimes';
import { trackUmamiEvent } from '../../utils/analytics';
import styles from './AirportSecurityWaitTimes.module.css';

const columnCount = 6;
const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const allEntries = airportSecurityWaitTimeGroups.flatMap(group => (
    group.days.flatMap(day => (
        day.entries.map((entry, index) => ({
            ...entry,
            id: `${group.id}-${day.day}-${entry.date}-${entry.airport}-${index}`,
            screeningId: group.id,
            screeningLabel: group.label,
            day: day.day,
        }))
    ))
));

const airportOptions = [...new Set(allEntries.map(entry => entry.airport))]
    .sort((first, second) => first.localeCompare(second));

function getEntryCount(group) {
    return group.days.reduce((total, day) => total + day.entries.length, 0);
}

function getDateTime(date) {
    const [month, day, year] = date.split('/');
    return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function getWaitSeconds(wait) {
    const [minutes, seconds] = wait.split(':').map(Number);
    return minutes * 60 + seconds;
}

function formatWait(totalSeconds) {
    if (totalSeconds === null || totalSeconds === undefined) return '—';

    const roundedSeconds = Math.round(totalSeconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const seconds = String(roundedSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function getAverageSeconds(entries) {
    if (!entries.length) return null;

    return entries.reduce(
        (total, entry) => total + getWaitSeconds(entry.wait),
        0
    ) / entries.length;
}

function getWorstAverage(entries, property) {
    const groupedEntries = new Map();

    entries.forEach(entry => {
        const groupName = entry[property];
        const group = groupedEntries.get(groupName) ?? [];
        group.push(entry);
        groupedEntries.set(groupName, group);
    });

    return [...groupedEntries.entries()]
        .map(([name, group]) => ({
            name,
            count: group.length,
            averageSeconds: getAverageSeconds(group),
        }))
        .sort((first, second) => (
            second.averageSeconds - first.averageSeconds
            || second.count - first.count
            || first.name.localeCompare(second.name)
        ))[0] ?? null;
}

function getScreeningComparison(entries) {
    const standardEntries = entries.filter(entry => entry.screeningId === 'standard');
    const precheckEntries = entries.filter(entry => entry.screeningId === 'precheck');

    if (!standardEntries.length || !precheckEntries.length) return null;

    const standardAverageSeconds = getAverageSeconds(standardEntries);
    const precheckAverageSeconds = getAverageSeconds(precheckEntries);

    return {
        standardAverageSeconds,
        precheckAverageSeconds,
        differenceSeconds: standardAverageSeconds - precheckAverageSeconds,
    };
}

function getInsights(entries) {
    if (!entries.length) {
        return {
            longest: null,
            averageSeconds: null,
            worstAirport: null,
            worstDay: null,
            screeningComparison: null,
        };
    }

    const longest = entries.reduce((currentLongest, entry) => (
        getWaitSeconds(entry.wait) > getWaitSeconds(currentLongest.wait)
            ? entry
            : currentLongest
    ));

    return {
        longest,
        averageSeconds: getAverageSeconds(entries),
        worstAirport: getWorstAverage(entries, 'airport'),
        worstDay: getWorstAverage(entries, 'day'),
        screeningComparison: getScreeningComparison(entries),
    };
}

function OptionalValue({ children }) {
    if (!children) {
        return <span className={styles.notRecorded} aria-label="Not recorded">—</span>;
    }

    return children;
}

function FilterField({ id, label, value, onChange, children }) {
    return (
        <label className={styles.filterField} htmlFor={id}>
            <span>{label}</span>
            <select id={id} value={value} onChange={onChange}>
                {children}
            </select>
        </label>
    );
}

function InsightCard({ label, value, detail }) {
    return (
        <article className={styles.insightCard}>
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{detail}</span>
        </article>
    );
}

function AirportSecurityWaitTimes() {
    const [screeningFilter, setScreeningFilter] = useState('all');
    const [dayFilter, setDayFilter] = useState('all');
    const [airportFilter, setAirportFilter] = useState('all');
    const [flightFilter, setFlightFilter] = useState('all');

    const filteredEntries = useMemo(() => (
        allEntries.filter(entry => {
            if (screeningFilter !== 'all' && entry.screeningId !== screeningFilter) return false;
            if (dayFilter !== 'all' && entry.day !== dayFilter) return false;
            if (airportFilter !== 'all' && entry.airport !== airportFilter) return false;

            if (flightFilter !== 'all') {
                const entryFlight = entry.flight?.toLowerCase() ?? 'not-recorded';
                if (entryFlight !== flightFilter) return false;
            }

            return true;
        })
    ), [airportFilter, dayFilter, flightFilter, screeningFilter]);

    const visibleGroups = useMemo(() => (
        airportSecurityWaitTimeGroups
            .map(group => ({
                ...group,
                days: group.days
                    .map(day => ({
                        ...day,
                        entries: filteredEntries.filter(entry => (
                            entry.screeningId === group.id && entry.day === day.day
                        )),
                    }))
                    .filter(day => day.entries.length),
            }))
            .filter(group => group.days.length)
    ), [filteredEntries]);

    const insights = useMemo(() => getInsights(filteredEntries), [filteredEntries]);
    const hasActiveFilters = [
        screeningFilter,
        dayFilter,
        airportFilter,
        flightFilter,
    ].some(filter => filter !== 'all');

    const handleFilterChange = (filterName, setFilter) => event => {
        const nextValue = event.target.value;
        setFilter(nextValue);
        trackUmamiEvent('security-wait-filter-change', {
            filter: filterName,
            value: nextValue,
        });
    };

    const resetFilters = () => {
        setScreeningFilter('all');
        setDayFilter('all');
        setAirportFilter('all');
        setFlightFilter('all');
    };

    const longestDetail = insights.longest
        ? `${insights.longest.date} · ${insights.longest.airport}`
        : 'No matching records';
    const worstAirportDetail = insights.worstAirport
        ? `${formatWait(insights.worstAirport.averageSeconds)} average · ${insights.worstAirport.count} ${insights.worstAirport.count === 1 ? 'wait' : 'waits'}`
        : 'No matching records';
    const worstDayDetail = insights.worstDay
        ? `${formatWait(insights.worstDay.averageSeconds)} average · ${insights.worstDay.count} ${insights.worstDay.count === 1 ? 'wait' : 'waits'}`
        : 'No matching records';
    const screeningComparisonValue = insights.screeningComparison
        ? `${formatWait(Math.abs(insights.screeningComparison.differenceSeconds))} ${
            insights.screeningComparison.differenceSeconds > 0
                ? 'faster'
                : insights.screeningComparison.differenceSeconds < 0
                    ? 'slower'
                    : 'difference'
        }`
        : '—';
    const screeningComparisonDetail = insights.screeningComparison
        ? `PreCheck ${formatWait(insights.screeningComparison.precheckAverageSeconds)} · Standard ${formatWait(insights.screeningComparison.standardAverageSeconds)}`
        : 'Both screening types needed';

    return (
        <section
            className={styles.waitTimesSection}
            aria-labelledby="security-wait-times-title"
            aria-describedby="security-wait-times-description"
        >
            <header className={styles.sectionHeader}>
                <div>
                    <p className={styles.eyebrow}>travel data</p>
                    <h2 id="security-wait-times-title">Airport security wait times</h2>
                </div>
                <div className={styles.headerDetails}>
                    <p id="security-wait-times-description" className={styles.description}>
                        I&apos;ve been tracking how long I wait in security lines for (almost) every trip
                        I&apos;ve taken since 8/15/23
                    </p>
                    <p className={styles.recordCount}>{allEntries.length} recorded waits</p>
                </div>
            </header>

            <div className={styles.filters} role="group" aria-labelledby="wait-time-filters-title">
                <div className={styles.filterHeading}>
                    <div>
                        <p id="wait-time-filters-title">Filter records</p>
                        <span aria-live="polite">
                            Showing {filteredEntries.length} of {allEntries.length}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                        data-umami-event="security-wait-filter-reset"
                    >
                        Reset
                    </button>
                </div>

                <div className={styles.filterGrid}>
                    <FilterField
                        id="security-screening-filter"
                        label="Screening"
                        value={screeningFilter}
                        onChange={handleFilterChange('screening', setScreeningFilter)}
                    >
                        <option value="all">All screening</option>
                        {airportSecurityWaitTimeGroups.map(group => (
                            <option key={group.id} value={group.id}>{group.label}</option>
                        ))}
                    </FilterField>

                    <FilterField
                        id="security-day-filter"
                        label="Day"
                        value={dayFilter}
                        onChange={handleFilterChange('day', setDayFilter)}
                    >
                        <option value="all">All days</option>
                        {dayOptions.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </FilterField>

                    <FilterField
                        id="security-airport-filter"
                        label="Airport"
                        value={airportFilter}
                        onChange={handleFilterChange('airport', setAirportFilter)}
                    >
                        <option value="all">All airports</option>
                        {airportOptions.map(airport => (
                            <option key={airport} value={airport}>{airport}</option>
                        ))}
                    </FilterField>

                    <FilterField
                        id="security-flight-filter"
                        label="Flight"
                        value={flightFilter}
                        onChange={handleFilterChange('flight', setFlightFilter)}
                    >
                        <option value="all">All flight types</option>
                        <option value="domestic">Domestic</option>
                        <option value="international">International</option>
                        <option value="not-recorded">Not recorded</option>
                    </FilterField>
                </div>
            </div>

            <section className={styles.insights} aria-labelledby="security-insights-title" aria-live="polite">
                <div className={styles.insightsHeading}>
                    <h3 id="security-insights-title">Insights</h3>
                    <span>Based on the records shown</span>
                </div>
                <div className={styles.insightGrid}>
                    <InsightCard
                        label="Longest wait"
                        value={insights.longest?.wait ?? '—'}
                        detail={longestDetail}
                    />
                    <InsightCard
                        label="Average wait"
                        value={formatWait(insights.averageSeconds)}
                        detail={filteredEntries.length
                            ? `Across ${filteredEntries.length} ${filteredEntries.length === 1 ? 'wait' : 'waits'}`
                            : 'No matching records'}
                    />
                    <InsightCard
                        label="Worst airport average"
                        value={insights.worstAirport?.name ?? '—'}
                        detail={worstAirportDetail}
                    />
                    <InsightCard
                        label="Worst day to travel"
                        value={insights.worstDay?.name ?? '—'}
                        detail={worstDayDetail}
                    />
                    <InsightCard
                        label="PreCheck average difference"
                        value={screeningComparisonValue}
                        detail={screeningComparisonDetail}
                    />
                </div>
            </section>

            <div className={styles.tableFrame}>
                <div className={styles.tableScroller} tabIndex={0}>
                    <table className={styles.waitTimesTable}>
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Wait <span>(min:sec)</span></th>
                                <th scope="col">Airport</th>
                                <th scope="col">Flight</th>
                                <th scope="col">Time of day</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>

                        {visibleGroups.length ? (
                            visibleGroups.map(group => (
                                <tbody key={group.id}>
                                    <tr className={styles.screeningRow}>
                                        <th colSpan={columnCount}>
                                            <span>{group.label}</span>
                                            <small>{getEntryCount(group)} entries</small>
                                        </th>
                                    </tr>

                                    {group.days.map(day => (
                                        <Fragment key={`${group.id}-${day.day}`}>
                                            <tr className={styles.dayRow}>
                                                <th colSpan={columnCount}>
                                                    {day.day}
                                                </th>
                                            </tr>

                                            {day.entries.map(entry => (
                                                <tr className={styles.dataRow} key={entry.id}>
                                                    <th scope="row">
                                                        <time dateTime={getDateTime(entry.date)}>{entry.date}</time>
                                                    </th>
                                                    <td className={styles.waitValue}>{entry.wait}</td>
                                                    <td className={styles.airportValue}>{entry.airport}</td>
                                                    <td>
                                                        <OptionalValue>
                                                            {entry.flight ? (
                                                                <span className={styles.flightBadge}>{entry.flight}</span>
                                                            ) : null}
                                                        </OptionalValue>
                                                    </td>
                                                    <td className={styles.timeValue}>
                                                        <OptionalValue>
                                                            {entry.time ? <time dateTime={entry.time}>{entry.time}</time> : null}
                                                        </OptionalValue>
                                                    </td>
                                                    <td>
                                                        <OptionalValue>{entry.note}</OptionalValue>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                </tbody>
                            ))
                        ) : (
                            <tbody>
                                <tr>
                                    <td className={styles.emptyState} colSpan={columnCount}>
                                        No wait times match these filters.
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AirportSecurityWaitTimes;
