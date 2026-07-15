import { motion } from 'react-magic-motion';
import styles from '../../pages/styles/Photography.module.css';

function PhotoTile({ photo, isDragging, onPhotoClick, shouldReduceMotion }) {
    return (
        <motion.button
            type="button"
            className={styles.photoTile}
            data-photo-id={photo.id}
            aria-label={`Open photo: ${photo.alt}`}
            onClick={event => onPhotoClick(photo, event)}
            style={{
                '--tile-x': `${photo.x}px`,
                '--tile-y': `${photo.y}px`,
                '--tile-w': `${photo.width}px`,
                '--tile-h': `${photo.height}px`,
                rotate: `${photo.rotate}deg`,
            }}
            whileHover={
                shouldReduceMotion || isDragging
                    ? undefined
                    : {
                        scale: 1.04,
                        y: -8,
                        zIndex: 4,
                    }
            }
            whileTap={
                shouldReduceMotion || isDragging
                    ? undefined
                    : {
                        scale: 0.985,
                    }
            }
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.img
                layoutId={`photo-image-${photo.id}`}
                src={photo.thumb || photo.src}
                alt={photo.alt}
                draggable="false"
                loading={photo.mobilePriority ? 'eager' : 'lazy'}
                decoding="async"
            />
        </motion.button>
    );
}

export default PhotoTile;
