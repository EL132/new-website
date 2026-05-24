import PhotoTile from './PhotoTile';
import styles from '../../pages/styles/Photography.module.css';

function PhotoCanvas({
    canvasRef,
    photos,
    world,
    isDragging,
    onPhotoClick,
    shouldReduceMotion,
}) {
    return (
        <div
            ref={canvasRef}
            className={styles.photoCanvas}
            data-photo-canvas
            style={{
                width: `${world.width}px`,
                height: `${world.height}px`,
            }}
            aria-hidden="false"
        >
            {photos.map(photo => (
                <PhotoTile
                    key={photo.id}
                    photo={photo}
                    isDragging={isDragging}
                    onPhotoClick={onPhotoClick}
                    shouldReduceMotion={shouldReduceMotion}
                />
            ))}
        </div>
    );
}

export default PhotoCanvas;
