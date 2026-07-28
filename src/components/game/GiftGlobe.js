import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { countryFeatures } from '../../data/worldCountries';
import styles from './GiftGlobe.module.css';

const LAND_COLORS = ['#406c55', '#54765a', '#726b45', '#806044', '#356358', '#69784d'];

function getStableColorIndex(country) {
    const key = String(country?.id ?? country?.properties?.name ?? 'country');
    return key.split('').reduce((sum, character) => sum + character.charCodeAt(0), 0) % LAND_COLORS.length;
}

function GiftGlobe({ trip }) {
    const globeRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 720, height: 640 });

    const globeMaterial = useMemo(() => new THREE.MeshPhongMaterial({
        color: '#4f89b5',
        emissive: '#102c49',
        specular: '#dce9dc',
        shininess: 12,
    }), []);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const updateDimensions = () => {
            const { width, height } = container.getBoundingClientRect();
            setDimensions({
                width: Math.max(1, Math.round(width)),
                height: Math.max(420, Math.round(height)),
            });
        };

        updateDimensions();

        if (!window.ResizeObserver) {
            window.addEventListener('resize', updateDimensions);
            return () => window.removeEventListener('resize', updateDimensions);
        }

        const observer = new ResizeObserver(updateDimensions);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!globeRef.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const controls = globeRef.current.controls();
        controls.autoRotate = false;
        controls.enableDamping = !prefersReducedMotion;
        controls.dampingFactor = 0.08;
        controls.enableZoom = dimensions.width > 700;

        globeRef.current.pointOfView(
            { ...trip.location, altitude: dimensions.width <= 700 ? 1.95 : 1.72 },
            prefersReducedMotion ? 0 : 1100
        );
    }, [trip, dimensions.width]);

    useEffect(() => () => globeMaterial.dispose(), [globeMaterial]);

    const isFocusedCountry = (country) => trip.focusCountries.includes(country?.properties?.name);

    return (
        <div
            ref={containerRef}
            className={styles.globeFrame}
            aria-label={`Globe focused on ${trip.displayCountry || trip.country}`}
            data-umami-event="trip-globe-interact"
            data-umami-event-trip={trip.id}
        >
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeMaterial={globeMaterial}
                showAtmosphere
                atmosphereColor="#89b7cd"
                atmosphereAltitude={0.17}
                polygonsData={countryFeatures}
                polygonGeoJsonGeometry="geometry"
                polygonCapColor={country => isFocusedCountry(country) ? '#f5c96b' : LAND_COLORS[getStableColorIndex(country)]}
                polygonSideColor={() => 'rgba(26, 42, 35, 0.42)'}
                polygonStrokeColor={() => 'rgba(255, 246, 221, 0.32)'}
                polygonAltitude={country => isFocusedCountry(country) ? 0.045 : 0.006}
                polygonCapCurvatureResolution={5}
                polygonsTransitionDuration={900}
                pointsData={trip.markers}
                pointLat="lat"
                pointLng="lng"
                pointLabel="label"
                pointColor={() => '#fff6d8'}
                pointAltitude={0.06}
                pointRadius={0.46}
                pointResolution={18}
                pointsTransitionDuration={800}
                ringsData={trip.markers}
                ringLat="lat"
                ringLng="lng"
                ringAltitude={0.065}
                ringColor={() => ['rgba(245,201,107,0.92)', 'rgba(245,201,107,0.2)', 'rgba(245,201,107,0)']}
                ringResolution={48}
                ringMaxRadius={1.6}
                ringPropagationSpeed={0.7}
                ringRepeatPeriod={1700}
            />
            <p className={styles.dragHint}>Drag to explore</p>
        </div>
    );
}

export default GiftGlobe;
