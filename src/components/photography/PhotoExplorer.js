import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'react-magic-motion';
import {
    mobilePhotos,
    mobilePhotoWorld,
    photoWorld,
    photos,
} from '../../data/photos';
import PhotoCanvas from './PhotoCanvas';
import PhotoLightbox from './PhotoLightbox';
import styles from '../../pages/styles/Photography.module.css';

const DRAG_THRESHOLD = 9;
const EDGE_BREATHING_ROOM = 160;
const INERTIA_FRICTION = 0.92;
const MIN_INERTIA_VELOCITY = 0.025;
const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

function getBounds(world, viewport) {
    return {
        minX: viewport.width - world.width - EDGE_BREATHING_ROOM,
        maxX: EDGE_BREATHING_ROOM,
        minY: viewport.height - world.height - EDGE_BREATHING_ROOM,
        maxY: EDGE_BREATHING_ROOM,
    };
}

function clampPosition(position, bounds) {
    return {
        x: clamp(position.x, bounds.minX, bounds.maxX),
        y: clamp(position.y, bounds.minY, bounds.maxY),
    };
}

function getInitialPosition(world) {
    const viewport = getViewportSize();
    const bounds = getBounds(world, viewport);

    return clampPosition(
        {
            x: viewport.width / 2 - world.initialFocus.x,
            y: viewport.height / 2 - world.initialFocus.y,
        },
        bounds
    );
}

function PhotoExplorer({ shouldReduceMotion, onExit }) {
    const canvasRef = useRef(null);
    const surfaceRef = useRef(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const dragRef = useRef(null);
    const frameRef = useRef(null);
    const inertiaFrameRef = useRef(null);
    const suppressPhotoClickRef = useRef(false);
    const openedFromPointerRef = useRef(false);
    const lastFocusedTileRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isMobile, setIsMobile] = useState(() => (
        typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia(MOBILE_MEDIA_QUERY).matches
    ));

    const activeWorld = isMobile ? mobilePhotoWorld : photoWorld;
    const activePhotos = isMobile ? mobilePhotos : photos;

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
        const handleChange = event => setIsMobile(event.matches);

        setIsMobile(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const applyCanvasTransform = useCallback(position => {
        if (!canvasRef.current) return;

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = requestAnimationFrame(() => {
            if (canvasRef.current) {
                canvasRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
            }
            frameRef.current = null;
        });
    }, []);

    const setPosition = useCallback((nextPosition, bounds = getBounds(activeWorld, getViewportSize())) => {
        const clampedPosition = clampPosition(nextPosition, bounds);
        positionRef.current = clampedPosition;
        applyCanvasTransform(clampedPosition);

        return clampedPosition;
    }, [activeWorld, applyCanvasTransform]);

    const stopInertia = useCallback(() => {
        if (inertiaFrameRef.current) {
            cancelAnimationFrame(inertiaFrameRef.current);
            inertiaFrameRef.current = null;
        }
    }, []);

    useLayoutEffect(() => {
        setPosition(getInitialPosition(activeWorld));
    }, [activeWorld, setPosition]);

    useEffect(() => {
        const previousBodyOverflow = document.body.style.overflow;
        const previousRootOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousRootOverflow;
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setPosition(positionRef.current);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setPosition]);

    useEffect(() => {
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            stopInertia();
        };
    }, [stopInertia]);

    const openPhoto = useCallback((photo, sourceElement) => {
        if (sourceElement) {
            lastFocusedTileRef.current = sourceElement;
        }

        setSelectedPhoto(photo);
    }, []);

    const closePhoto = useCallback(() => {
        setSelectedPhoto(null);
        window.requestAnimationFrame(() => {
            lastFocusedTileRef.current?.focus();
        });
    }, []);

    const runInertia = useCallback((velocityX, velocityY) => {
        if (shouldReduceMotion) return;

        let vx = velocityX;
        let vy = velocityY;
        let lastTime = performance.now();

        const step = time => {
            const delta = Math.min(time - lastTime, 32);
            lastTime = time;

            const bounds = getBounds(activeWorld, getViewportSize());
            const currentPosition = positionRef.current;
            const nextPosition = clampPosition(
                {
                    x: currentPosition.x + vx * delta,
                    y: currentPosition.y + vy * delta,
                },
                bounds
            );

            if (nextPosition.x === bounds.minX || nextPosition.x === bounds.maxX) {
                vx = 0;
            }
            if (nextPosition.y === bounds.minY || nextPosition.y === bounds.maxY) {
                vy = 0;
            }

            setPosition(nextPosition, bounds);

            vx *= INERTIA_FRICTION;
            vy *= INERTIA_FRICTION;

            if (Math.abs(vx) > MIN_INERTIA_VELOCITY || Math.abs(vy) > MIN_INERTIA_VELOCITY) {
                inertiaFrameRef.current = requestAnimationFrame(step);
            } else {
                inertiaFrameRef.current = null;
            }
        };

        if (Math.abs(vx) > MIN_INERTIA_VELOCITY || Math.abs(vy) > MIN_INERTIA_VELOCITY) {
            inertiaFrameRef.current = requestAnimationFrame(step);
        }
    }, [activeWorld, setPosition, shouldReduceMotion]);

    const handlePointerDown = event => {
        if (selectedPhoto) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        stopInertia();

        const startingPhotoTile = event.target.closest('[data-photo-id]');

        dragRef.current = {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            startX: positionRef.current.x,
            startY: positionRef.current.y,
            lastClientX: event.clientX,
            lastClientY: event.clientY,
            lastTime: performance.now(),
            velocityX: 0,
            velocityY: 0,
            hasDragged: false,
            startingPhotoId: startingPhotoTile?.dataset.photoId,
            startingPhotoElement: startingPhotoTile,
        };

        suppressPhotoClickRef.current = false;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = event => {
        const dragState = dragRef.current;
        if (!dragState || dragState.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - dragState.startClientX;
        const deltaY = event.clientY - dragState.startClientY;
        const movedFarEnough = Math.hypot(deltaX, deltaY) > DRAG_THRESHOLD;

        if (movedFarEnough) {
            dragState.hasDragged = true;
            suppressPhotoClickRef.current = true;
        }

        const now = performance.now();
        const deltaTime = Math.max(now - dragState.lastTime, 1);

        dragState.velocityX = (event.clientX - dragState.lastClientX) / deltaTime;
        dragState.velocityY = (event.clientY - dragState.lastClientY) / deltaTime;
        dragState.lastClientX = event.clientX;
        dragState.lastClientY = event.clientY;
        dragState.lastTime = now;

        setPosition({
            x: dragState.startX + deltaX,
            y: dragState.startY + deltaY,
        });
    };

    const handlePointerUp = event => {
        const dragState = dragRef.current;
        if (!dragState || dragState.pointerId !== event.pointerId) return;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        setIsDragging(false);
        dragRef.current = null;

        if (dragState.hasDragged) {
            suppressPhotoClickRef.current = true;
            window.setTimeout(() => {
                suppressPhotoClickRef.current = false;
            }, 0);

            runInertia(dragState.velocityX, dragState.velocityY);
            return;
        }

        if (dragState.startingPhotoId) {
            const photo = activePhotos.find(item => item.id === dragState.startingPhotoId);

            if (photo) {
                openedFromPointerRef.current = true;
                openPhoto(photo, dragState.startingPhotoElement);
                window.setTimeout(() => {
                    openedFromPointerRef.current = false;
                }, 0);
            }
        }
    };

    const handlePointerCancel = event => {
        const dragState = dragRef.current;
        if (!dragState || dragState.pointerId !== event.pointerId) return;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        dragRef.current = null;
        setIsDragging(false);
    };

    const handlePhotoClick = (photo, event) => {
        if (suppressPhotoClickRef.current || openedFromPointerRef.current) {
            event.preventDefault();
            return;
        }

        openPhoto(photo, event.currentTarget);
    };

    const transition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.85, ease: [0.22, 1, 0.36, 1] };

    return (
        <motion.main
            ref={surfaceRef}
            className={`${styles.explorer} ${isDragging ? styles.explorerDragging : ''}`}
            data-photo-explorer
            data-umami-event="photography-wall-interact"
            data-umami-event-layout={isMobile ? 'mobile' : 'desktop'}
            aria-label={isMobile
                ? 'Interactive photography wall. Drag to explore and tap a photo to expand it.'
                : 'Interactive photography explorer'}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
        >
            <button
                type="button"
                className={styles.explorerExit}
                onClick={onExit}
                onPointerDown={event => event.stopPropagation()}
                aria-label="Return to photography landing page"
                data-umami-event="photography-exit"
            >
                <span className={styles.visuallyHidden}>Return to photography landing page</span>
            </button>

            <div className={styles.explorerHint} aria-hidden="true">
                {isMobile ? (
                    <>
                        <span className={styles.explorerHintPrimary}>drag the photo wall</span>
                        <span className={styles.explorerHintSecondary}>tap any image to open</span>
                    </>
                ) : 'drag to explore / tap to expand'}
            </div>

            <PhotoCanvas
                canvasRef={canvasRef}
                photos={activePhotos}
                world={activeWorld}
                isDragging={isDragging}
                onPhotoClick={handlePhotoClick}
                shouldReduceMotion={shouldReduceMotion}
            />

            <AnimatePresence>
                {selectedPhoto && (
                    <PhotoLightbox
                        key={selectedPhoto.id}
                        photo={selectedPhoto}
                        onClose={closePhoto}
                        shouldReduceMotion={shouldReduceMotion}
                        isMobile={isMobile}
                    />
                )}
            </AnimatePresence>
        </motion.main>
    );
}

export default PhotoExplorer;
