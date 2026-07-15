import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ThingsShowcase.module.css';

const VISIBLE_GHOST_CARD_COUNT = 3;
const MOBILE_SHOWCASE_QUERY = '(max-width: 720px)';

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

function useMobileShowcase() {
    const [isMobileShowcase, setIsMobileShowcase] = useState(() => (
        typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia(MOBILE_SHOWCASE_QUERY).matches
    ));

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_SHOWCASE_QUERY);
        const updateLayout = () => setIsMobileShowcase(mediaQuery.matches);

        updateLayout();
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', updateLayout);
            return () => mediaQuery.removeEventListener('change', updateLayout);
        }

        mediaQuery.addListener(updateLayout);
        return () => mediaQuery.removeListener(updateLayout);
    }, []);

    return isMobileShowcase;
}

function MobileOpenLink({ item }) {
    if (!item.href) return null;

    const isExternal = /^https?:\/\//i.test(item.href);
    const content = (
        <>
            view this moment
            <span aria-hidden="true">↗</span>
        </>
    );
    const commonProps = {
        className: styles.mobileOpenLink,
        target: '_blank',
        rel: 'noreferrer',
    };

    if (isExternal) {
        return <a href={item.href} {...commonProps}>{content}</a>;
    }

    return <Link to={item.href} {...commonProps}>{content}</Link>;
}

function ShowcaseControl({ item, index, isActive, isMobileShowcase, onActivate }) {
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
        onFocus: isMobileShowcase ? undefined : onActivate,
        onPointerEnter: isMobileShowcase ? undefined : onActivate,
        'aria-controls': isMobileShowcase ? `thing-details-${index}` : undefined,
        'aria-expanded': isMobileShowcase ? isActive : undefined,
    };

    if (item.href) {
        if (isMobileShowcase) {
            return (
                <button
                    type="button"
                    onClick={onActivate}
                    aria-label={`${isActive ? 'Hide' : 'Show'} details for ${item.title}`}
                    {...commonProps}
                >
                    {controlContent}
                </button>
            );
        }

        const isExternal = /^https?:\/\//i.test(item.href);
        const newWindowProps = {
            target: '_blank',
            rel: 'noreferrer',
        };

        if (isExternal) {
            return (
                <a href={item.href} {...newWindowProps} {...commonProps}>
                    {controlContent}
                </a>
            );
        }

        return (
            <Link to={item.href} {...newWindowProps} {...commonProps}>
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

function MobileRowDetails({ item, detailsId }) {
    const image = item.image || item.preview;

    return (
        <div id={detailsId} className={styles.mobileRowDetails}>
            {image ? (
                <img
                    className={styles.mobileRowImage}
                    src={item.mobileImage || image}
                    alt=""
                    style={{ aspectRatio: item.mobileAspect || '4 / 5' }}
                    loading="eager"
                    decoding="async"
                />
            ) : null}
            {item.description ? (
                <p className={styles.mobileRowDescription}>{item.description}</p>
            ) : null}
            <MobileOpenLink item={item} />
        </div>
    );
}

function ThingsShowcase({ items }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileExpandedIndex, setMobileExpandedIndex] = useState(0);
    const isMobileShowcase = useMobileShowcase();

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
                {!isMobileShowcase ? (
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
                                                loading={isActive ? 'eager' : 'lazy'}
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
                ) : null}

                <div className={styles.connectorColumn} aria-hidden="true">
                    <span className={styles.activeMarker}>{formatItemNumber(activeIndex)}</span>
                    <span className={styles.connectorLine} />
                </div>

                <ol className={styles.itemList}>
                    {items.map((item, index) => {
                        const isActive = index === (isMobileShowcase ? mobileExpandedIndex : activeIndex);

                        return (
                            <li className={styles.itemRow} key={`${item.title}-row-${index}`}>
                                <ShowcaseControl
                                    item={item}
                                    index={index}
                                    isActive={isActive}
                                    isMobileShowcase={isMobileShowcase}
                                    onActivate={() => {
                                        if (isMobileShowcase) {
                                            setMobileExpandedIndex(currentIndex => (
                                                currentIndex === index ? null : index
                                            ));
                                            return;
                                        }

                                        setActiveIndex(index);
                                    }}
                                />
                                {isActive && isMobileShowcase ? (
                                    <MobileRowDetails
                                        item={item}
                                        detailsId={`thing-details-${index}`}
                                    />
                                ) : null}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

export default ThingsShowcase;
