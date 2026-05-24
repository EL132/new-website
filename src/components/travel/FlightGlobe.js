import { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { countryFeatures } from '../../data/worldCountries';
import styles from './FlightGlobe.module.css';

function FlightGlobe({ arcs, airports }) {
    const globeRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 900, height: 640 });

    const globeMaterial = useMemo(() => (
        new THREE.MeshPhongMaterial({
            color: '#11100e',
            emissive: '#050505',
            specular: '#f7f1e8',
            shininess: 6,
        })
    ), []);

    const visualArcs = useMemo(() => (
        arcs.flatMap(arc => ([
            { ...arc, visualType: 'base' },
            { ...arc, visualType: 'pulse' },
        ]))
    ), [arcs]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const updateDimensions = () => {
            const { width, height } = container.getBoundingClientRect();
            setDimensions({
                width: Math.max(320, Math.round(width)),
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

        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.35;
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;

        globeRef.current.pointOfView({ lat: 24, lng: -44, altitude: 2.35 }, 800);
    }, [arcs.length]);

    return (
        <div ref={containerRef} className={styles.globeFrame}>
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeMaterial={globeMaterial}
                showAtmosphere
                atmosphereColor="#11100e"
                atmosphereAltitude={0.14}
                polygonsData={countryFeatures}
                polygonGeoJsonGeometry="geometry"
                polygonCapColor={() => 'rgba(247, 241, 232, 0.16)'}
                polygonSideColor={() => 'rgba(247, 241, 232, 0.05)'}
                polygonStrokeColor={() => 'rgba(247, 241, 232, 0.34)'}
                polygonAltitude={0.006}
                polygonCapCurvatureResolution={5}
                polygonsTransitionDuration={800}
                arcsData={visualArcs}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcAltitude="altitude"
                arcColor={arc => arc.visualType === 'base'
                    ? 'rgba(247, 241, 232, 0.34)'
                    : ['rgba(247, 241, 232, 0.96)', 'rgba(17, 17, 17, 0.86)']}
                arcDashLength={arc => arc.visualType === 'base' ? 1 : 0.36}
                arcDashGap={arc => arc.visualType === 'base' ? 0 : 0.82}
                arcDashInitialGap={arc => arc.visualType === 'base' ? 0 : (Number(arc.id) % 13) * 0.075}
                arcDashAnimateTime={arc => arc.visualType === 'base' ? 0 : 3600}
                arcStroke={arc => arc.visualType === 'base' ? 0.38 : 0.7}
                arcLabel="label"
                arcCurveResolution={64}
                arcsTransitionDuration={1000}
                pointsData={airports}
                pointLat="lat"
                pointLng="lng"
                pointLabel="label"
                pointColor={airport => airport.flightCount > 2
                    ? 'rgba(247, 241, 232, 0.95)'
                    : 'rgba(247, 241, 232, 0.82)'}
                pointAltitude={0.035}
                pointRadius={airport => Math.min(0.62, 0.34 + airport.flightCount * 0.025)}
                pointResolution={14}
                pointsTransitionDuration={1000}
                ringsData={airports}
                ringLat="lat"
                ringLng="lng"
                ringAltitude={0.041}
                ringColor={airport => airport.flightCount <= 2
                    ? ['rgba(247, 241, 232, 0.9)', 'rgba(247, 241, 232, 0.18)', 'rgba(247, 241, 232, 0)']
                    : ['rgba(247, 241, 232, 0.48)', 'rgba(247, 241, 232, 0.08)', 'rgba(247, 241, 232, 0)']}
                ringResolution={48}
                ringMaxRadius={airport => airport.flightCount <= 2 ? 1.4 : 0.95}
                ringPropagationSpeed={0.55}
                ringRepeatPeriod={2600}
            />
        </div>
    );
}

export default FlightGlobe;
