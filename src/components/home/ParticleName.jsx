import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 1500;
const OVERSAMPLE = 4;
const PARTICLE_COLOR = '#111111';

function randomUnit(seed) {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
}

function hasWebGLSupport() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return false;
    }

    try {
        const canvas = document.createElement('canvas');
        return Boolean(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl2') ||
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl'))
        );
    } catch {
        return false;
    }
}

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return undefined;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

        handleChange();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    return prefersReducedMotion;
}

function createTextParticlePositions(text, { width, height }) {
    const safeWidth = Math.max(1, Math.round(width));
    const safeHeight = Math.max(1, Math.round(height));
    const canvas = document.createElement('canvas');
    const canvasWidth = safeWidth * OVERSAMPLE;
    const canvasHeight = safeHeight * OVERSAMPLE;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!context) {
        return {
            basePositions: new Float32Array(0),
            seeds: new Float32Array(0),
            count: 0,
            width: safeWidth,
            height: safeHeight,
        };
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    const rawFontSize = canvasHeight * 0.88;
    context.font = `700 ${rawFontSize}px Arial, Helvetica, sans-serif`;

    const measuredWidth = context.measureText(text).width || 1;
    const fontSize = rawFontSize * Math.min(1, (canvasWidth * 0.96) / measuredWidth);
    context.font = `700 ${fontSize}px Arial, Helvetica, sans-serif`;

    const metrics = context.measureText(text);
    const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.74;
    const descent = metrics.actualBoundingBoxDescent || fontSize * 0.18;
    const baseline = (canvasHeight + ascent - descent) / 2;

    context.fillText(text, canvasWidth / 2, baseline);

    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
    const sampleStep = Math.max(4, Math.round(OVERSAMPLE * 1.35));
    const candidates = [];

    for (let y = 0; y < canvasHeight; y += sampleStep) {
        for (let x = 0; x < canvasWidth; x += sampleStep) {
            const alpha = imageData[(y * canvasWidth + x) * 4 + 3];

            if (alpha > 88) {
                const seed = candidates.length + 1;
                const jitterX = (randomUnit(seed) - 0.5) * 0.45;
                const jitterY = (randomUnit(seed + 17) - 0.5) * 0.45;
                const depth = (randomUnit(seed + 31) - 0.5) * 5;

                candidates.push({
                    x: x / OVERSAMPLE - safeWidth / 2 + jitterX,
                    y: safeHeight / 2 - y / OVERSAMPLE + jitterY,
                    z: depth,
                    seed: randomUnit(seed + 43),
                });
            }
        }
    }

    const count = Math.min(MAX_PARTICLES, candidates.length);
    const basePositions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    if (count === 0) {
        return { basePositions, seeds, count, width: safeWidth, height: safeHeight };
    }

    const stride = candidates.length / count;

    for (let index = 0; index < count; index += 1) {
        const candidate = candidates[Math.floor(index * stride)];
        const arrayIndex = index * 3;

        basePositions[arrayIndex] = candidate.x;
        basePositions[arrayIndex + 1] = candidate.y;
        basePositions[arrayIndex + 2] = candidate.z;
        seeds[index] = candidate.seed;
    }

    return { basePositions, seeds, count, width: safeWidth, height: safeHeight };
}

class ParticleNameErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        this.props.onError?.(error);
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}

function ParticleTextPoints({ text, reducedMotion, onReady }) {
    const geometryRef = useRef(null);
    const pointsRef = useRef(null);
    const hoverRef = useRef({ active: false, amount: 0, x: 0, y: 0 });
    const { invalidate, size } = useThree();
    const width = Math.round(size.width);
    const height = Math.round(size.height);

    const particleData = useMemo(() => {
        if (width < 8 || height < 8) {
            return null;
        }

        return createTextParticlePositions(text, { width, height });
    }, [height, text, width]);

    const positionArray = useMemo(() => {
        if (!particleData) {
            return new Float32Array(0);
        }

        return new Float32Array(particleData.basePositions);
    }, [particleData]);

    useEffect(() => {
        if (particleData?.count > 0) {
            onReady?.();
        }
    }, [onReady, particleData]);

    useEffect(() => {
        if (!reducedMotion || !particleData || !geometryRef.current) {
            return;
        }

        const positionAttribute = geometryRef.current.getAttribute('position');
        positionAttribute.array.set(particleData.basePositions);
        positionAttribute.needsUpdate = true;

        if (pointsRef.current) {
            pointsRef.current.rotation.set(0, 0, 0);
        }

        invalidate();
    }, [invalidate, particleData, reducedMotion]);

    useFrame((state, delta) => {
        if (!particleData || !geometryRef.current) {
            return;
        }

        const positionAttribute = geometryRef.current.getAttribute('position');
        const positions = positionAttribute.array;
        const { basePositions, seeds, count } = particleData;
        const elapsed = state.clock.elapsedTime;

        if (reducedMotion) {
            for (let index = 0; index < count * 3; index += 1) {
                positions[index] = basePositions[index];
            }

            positionAttribute.needsUpdate = true;
            return;
        }

        const hover = hoverRef.current;
        const ease = Math.min(1, delta * 7);
        hover.amount = THREE.MathUtils.lerp(hover.amount, hover.active ? 1 : 0, ease);

        const radius = Math.max(particleData.width * 0.34, particleData.height * 1.7);

        for (let index = 0; index < count; index += 1) {
            const arrayIndex = index * 3;
            const baseX = basePositions[arrayIndex];
            const baseY = basePositions[arrayIndex + 1];
            const baseZ = basePositions[arrayIndex + 2];
            const seed = seeds[index];
            const idleX = Math.sin(elapsed * 0.58 + seed * 8.2) * 0.18;
            const idleY = Math.cos(elapsed * 0.48 + seed * 7.1) * 0.16;
            const idleZ = Math.sin(elapsed * 0.52 + seed * 6.7) * 0.85;
            let targetX = baseX + idleX;
            let targetY = baseY + idleY;
            let targetZ = baseZ + idleZ;

            if (hover.amount > 0.001) {
                const distanceX = baseX - hover.x;
                const distanceY = baseY - hover.y;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY) || 1;
                const proximity = Math.max(0, 1 - distance / radius);
                const influence = proximity * proximity * hover.amount;
                const ripple = Math.sin(distance * 0.11 - elapsed * 2.2);

                targetX += (distanceX / distance) * influence * 4 + ripple * influence * 0.5;
                targetY += (distanceY / distance) * influence * 2.2;
                targetZ += influence * (8 + seed * 8) + ripple * influence * 2;
            }

            positions[arrayIndex] = THREE.MathUtils.lerp(positions[arrayIndex], targetX, ease);
            positions[arrayIndex + 1] = THREE.MathUtils.lerp(positions[arrayIndex + 1], targetY, ease);
            positions[arrayIndex + 2] = THREE.MathUtils.lerp(positions[arrayIndex + 2], targetZ, ease);
        }

        if (pointsRef.current) {
            pointsRef.current.rotation.x = THREE.MathUtils.lerp(
                pointsRef.current.rotation.x,
                Math.sin(elapsed * 0.32) * 0.012 - hover.amount * 0.025,
                ease * 0.4
            );
            pointsRef.current.rotation.y = THREE.MathUtils.lerp(
                pointsRef.current.rotation.y,
                Math.sin(elapsed * 0.28) * 0.018 + hover.amount * 0.055,
                ease * 0.4
            );
        }

        positionAttribute.needsUpdate = true;
    });

    if (!particleData || particleData.count === 0) {
        return null;
    }

    const handlePointerMove = (event) => {
        if (reducedMotion) {
            return;
        }

        hoverRef.current.active = true;
        hoverRef.current.x = event.point.x;
        hoverRef.current.y = event.point.y;
    };

    const handlePointerOut = () => {
        hoverRef.current.active = false;
    };

    return (
        <>
            <mesh
                position={[0, 0, -8]}
                onPointerOver={handlePointerMove}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerOut}
            >
                <planeGeometry args={[particleData.width, particleData.height]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <points ref={pointsRef}>
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute attach="attributes-position" args={[positionArray, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    color={PARTICLE_COLOR}
                    depthWrite={false}
                    opacity={0.94}
                    size={1.45}
                    sizeAttenuation={false}
                    transparent
                />
            </points>
        </>
    );
}

function ParticleName({ text = 'Elias', className, onReady, onError }) {
    const reducedMotion = usePrefersReducedMotion();
    const [webglAvailable, setWebglAvailable] = useState(null);

    useEffect(() => {
        const isAvailable = hasWebGLSupport();
        setWebglAvailable(isAvailable);

        if (!isAvailable) {
            onError?.();
        }
    }, [onError]);

    if (!webglAvailable) {
        return null;
    }

    return (
        <ParticleNameErrorBoundary onError={onError}>
            <Canvas
                aria-hidden="true"
                className={className}
                dpr={[1, 2]}
                fallback={null}
                frameloop={reducedMotion ? 'demand' : 'always'}
                gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
                orthographic
                camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 200 }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <ParticleTextPoints text={text} reducedMotion={reducedMotion} onReady={onReady} />
            </Canvas>
        </ParticleNameErrorBoundary>
    );
}

export default ParticleName;
