import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ThingsShowcase.module.css';

const VISIBLE_GHOST_CARD_COUNT = 3;

function formatItemNumber(index) {
    return String(index + 1).padStart(2, '0');
}

function getCardStyle({ index, activeIndex, itemCount, background }) {
    const distance = Math.abs(index - activeIndex);
    const stackLevel = Math.min(distance, VISIBLE_GHOST_CARD_COUNT);
    const isActive = index === activeIndex;
    const isVisible = distance <= VISIBLE_GHOST_CARD_COUNT;

    return {
        '--card-background': background || '#f2eee8',
        '--card-x': isActive ? '0px' : `${stackLevel * -18}px`,
        '--card-y': isActive ? '0px' : `${stackLevel * 12}px`,
        '--card-scale': isActive ? 1 : 1 - stackLevel * 0.045,
        '--card-opacity': isActive ? 1 : isVisible ? Math.max(0.12, 0.48 - stackLevel * 0.09) : 0,
        '--card-z': isActive ? itemCount + 1 : itemCount - stackLevel,
    };
}

function ShowcaseControl({ item, index, isActive, onActivate }) {
    const className = `${styles.listControl} ${isActive ? styles.listControlActive : ''}`;
    const controlContent = (
        <>
            <span className={styles.listNumber}>{formatItemNumber(index)}</span>
            <span className={styles.listText}>
                {item.kicker || item.label ? (
                    <span className={styles.listKicker}>{item.kicker || item.label}</span>
                ) : null}
                <span className={styles.listTitle}>{item.title}</span>
            </span>
        </>
    );
    const commonProps = {
        className,
        onFocus: onActivate,
        onPointerEnter: onActivate,
    };

    if (item.href) {
        const isExternal = /^https?:\/\//i.test(item.href);

        if (isExternal) {
            return (
                <a href={item.href} {...commonProps}>
                    {controlContent}
                </a>
            );
        }

        return (
            <Link to={item.href} {...commonProps}>
                {controlContent}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onActivate} {...commonProps}>
            {controlContent}
        </button>
    );
}

function ThingsShowcase({ items }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!items.length) {
        return null;
    }

    return (
        <section
            className={styles.showcase}
            style={{
                '--item-count': items.length,
                '--active-index': activeIndex,
            }}
            aria-label="Things I've done showcase"
        >
            <div className={styles.showcaseGrid}>
                <div className={styles.previewColumn}>
                    <div className={styles.cardDeck} aria-live="polite">
                        {items.map((item, index) => {
                            const image = item.image || item.preview;
                            const isActive = index === activeIndex;

                            return (
                                <article
                                    key={`${item.title}-${index}`}
                                    className={`${styles.previewCard} ${isActive ? styles.previewCardActive : ''} ${image ? styles.previewCardImage : ''}`}
                                    style={getCardStyle({
                                        index,
                                        activeIndex,
                                        itemCount: items.length,
                                        background: item.background,
                                    })}
                                    aria-hidden={!isActive}
                                >
                                    {image ? (
                                        <img
                                            className={styles.previewImage}
                                            src={image}
                                            alt=""
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                        />
                                    ) : null}
                                    <div className={styles.cardWash} />
                                    <div className={styles.cardContent}>
                                        {item.kicker || item.label ? (
                                            <p className={styles.cardKicker}>{item.kicker || item.label}</p>
                                        ) : null}
                                        <p className={styles.cardNumber}>{formatItemNumber(index)}</p>
                                        <h2 className={styles.cardTitle}>{item.title}</h2>
                                        {item.description ? (
                                            <p className={styles.cardDescription}>{item.description}</p>
                                        ) : null}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.connectorColumn} aria-hidden="true">
                    <span className={styles.activeMarker}>{formatItemNumber(activeIndex)}</span>
                    <span className={styles.connectorLine} />
                </div>

                <ol className={styles.itemList}>
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <li className={styles.itemRow} key={`${item.title}-row-${index}`}>
                                <ShowcaseControl
                                    item={item}
                                    index={index}
                                    isActive={isActive}
                                    onActivate={() => setActiveIndex(index)}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

export default ThingsShowcase;
