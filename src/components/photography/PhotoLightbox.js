import { useEffect, useRef } from 'react';
import { motion } from 'react-magic-motion';
import { trackUmamiEvent } from '../../utils/analytics';
import styles from '../../pages/styles/Photography.module.css';

function PhotoLightbox({ photo, onClose, shouldReduceMotion, isMobile }) {
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        closeButtonRef.current?.focus();

        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (isMobile && event.key === 'Tab') {
                const focusableElements = dialogRef.current?.querySelectorAll(
                    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
                );

                if (!focusableElements?.length) {
                    event.preventDefault();
                    dialogRef.current?.focus();
                    return;
                }

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobile, onClose]);

    const transition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

    return (
        <motion.div
            ref={dialogRef}
            className={styles.lightboxBackdrop}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title ? `Expanded photo: ${photo.title}` : 'Expanded photo'}
            tabIndex={-1}
            onPointerDown={isMobile ? event => event.stopPropagation() : undefined}
            onClick={event => {
                if (event.target === event.currentTarget) {
                    trackUmamiEvent('photo-close', {
                        photo: photo.id,
                        element: 'backdrop',
                    });
                    onClose();
                }
            }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
        >
            <button
                ref={closeButtonRef}
                type="button"
                className={styles.lightboxClose}
                onClick={onClose}
                aria-label="Close expanded photo"
                data-umami-event="photo-close"
                data-umami-event-photo={photo.id}
                data-umami-event-element="close-button"
            >
                X
            </button>

            <motion.figure
                className={styles.lightboxFigure}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                transition={transition}
            >
                <motion.img
                    layoutId={`photo-image-${photo.id}`}
                    className={styles.lightboxImage}
                    src={photo.src}
                    alt={photo.alt}
                    draggable="false"
                />

                {(photo.title || photo.date) && (
                    <figcaption className={styles.lightboxCaption}>
                        {photo.title && <span>{photo.title}</span>}
                        {photo.date && <span>{photo.date}</span>}
                    </figcaption>
                )}
            </motion.figure>
        </motion.div>
    );
}

export default PhotoLightbox;
