import { useEffect, useRef } from 'react';
import { motion } from 'react-magic-motion';
import styles from '../../pages/styles/Photography.module.css';

function PhotoLightbox({ photo, onClose, shouldReduceMotion }) {
    const closeButtonRef = useRef(null);

    useEffect(() => {
        closeButtonRef.current?.focus();

        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const transition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

    return (
        <motion.div
            className={styles.lightboxBackdrop}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title ? `Expanded photo: ${photo.title}` : 'Expanded photo'}
            onClick={event => {
                if (event.target === event.currentTarget) {
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
