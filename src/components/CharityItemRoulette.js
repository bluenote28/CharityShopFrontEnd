import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import FeaturedListingCard from './FeaturedListingCard';
import { getItems } from '../utilities/BackEndClient';
import NormalSpinner from './Spinner';

const STEP_MS = 4000;
const GAP_PX = 16;

function visibleCountForWidth(width) {
  if (width <= 575) {
    return 1;
  }
  if (width <= 991) {
    return 2;
  }
  return 4;
}

function CharityItemRoulette({ charity: assignedCharity = null, excludeIds = [], stepDelay = 0 }) {
  const navigate = useNavigate();
  const charitiesState = useSelector((state) => state.charities);
  const { loading, charities } = charitiesState;
  const [charity, setCharity] = useState(null);
  const [triedIds, setTriedIds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [instant, setInstant] = useState(false);
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (charity || !charities?.length) {
      return;
    }
    if (assignedCharity) {
      setCharity(assignedCharity);
      setTriedIds([assignedCharity.id]);
      return;
    }
    const available = charities.filter((entry) => !excludeIds.includes(entry.id));
    const pool = available.length ? available : charities;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setCharity(pick);
    setTriedIds([pick.id]);
  }, [assignedCharity, charities, charity, excludeIds]);

  const charityId = charity?.id;
  const { isPending, data } = useQuery({
    queryKey: ['charity-roulette', charityId],
    queryFn: () => getItems(null, null, null, null, 1, charityId),
    enabled: Boolean(charityId),
  });

  const items = data?.results || [];

  useEffect(() => {
    if (isPending || !charity || !charities?.length) {
      return;
    }
    if (items.length > 0) {
      return;
    }
    if (triedIds.length >= charities.length) {
      return;
    }
    const blocked = new Set([...excludeIds, ...triedIds]);
    const remaining = charities.filter((entry) => !blocked.has(entry.id));
    if (remaining.length === 0) {
      return;
    }
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    setCharity(next);
    setTriedIds((current) => [...current, next.id]);
    setOffset(0);
  }, [isPending, items.length, charity, charities, triedIds]);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }
    const measure = () => {
      setViewportWidth(node.clientWidth);
      setVisibleCount(visibleCountForWidth(node.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [items.length, isPending]);

  const canSpin = items.length > visibleCount;

  useEffect(() => {
    if (offset !== items.length || items.length === 0) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setInstant(true);
      setOffset(0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [offset, items.length]);

  useEffect(() => {
    if (!instant) {
      return;
    }
    const frame = window.requestAnimationFrame(() => setInstant(false));
    return () => window.cancelAnimationFrame(frame);
  }, [instant]);

  useEffect(() => {
    if (!canSpin || paused || reduceMotion) {
      return;
    }
    let intervalId;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setOffset((current) => current + 1);
      }, STEP_MS);
    }, stepDelay);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [canSpin, paused, reduceMotion, stepDelay]);

  function step(direction) {
    if (!canSpin) {
      return;
    }
    setOffset((current) => {
      if (direction > 0) {
        return current + 1;
      }
      if (current === 0) {
        return items.length - 1;
      }
      return current - 1;
    });
  }

  if (loading && !charities?.length) {
    return <NormalSpinner />;
  }

  if (!charity) {
    return null;
  }

  const slotWidth = viewportWidth > 0
    ? (viewportWidth - GAP_PX * (visibleCount - 1)) / visibleCount
    : 0;
  const loopItems = canSpin ? items.concat(items.slice(0, visibleCount)) : items;
  const translateX = slotWidth > 0 ? -(offset * (slotWidth + GAP_PX)) : 0;

  return (
    <section
      className="home-roulette"
      aria-roledescription="carousel"
      aria-label={`Items benefiting ${charity.name}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="home-featured-header">
        <h2 className="home-featured-title">Items benefiting {charity.name}</h2>
        <div className="home-roulette-actions">
          {canSpin && (
            <>
              <button type="button" className="home-roulette-nav" onClick={() => step(-1)} aria-label="Previous items">
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path fill="currentColor" d="M10.5 2.5 5 8l5.5 5.5 1-1L7 8l4.5-4.5z" />
                </svg>
              </button>
              <button type="button" className="home-roulette-nav" onClick={() => step(1)} aria-label="Next items">
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path fill="currentColor" d="M5.5 2.5 11 8 5.5 13.5l-1-1L9 8 4.5 3.5z" />
                </svg>
              </button>
            </>
          )}
          <button
            type="button"
            className="home-view-all"
            onClick={() => navigate(`/charities/${charity.id}`)}
          >
            View all listings →
          </button>
        </div>
      </div>

      {isPending && <NormalSpinner />}
      {!isPending && items.length === 0 && (
        <p className="text-center">No listings to display yet.</p>
      )}
      {!isPending && items.length > 0 && (
        <div className="home-roulette-viewport" ref={viewportRef}>
          <div
            className="home-roulette-track"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: reduceMotion || instant ? 'none' : 'transform 220ms ease-out',
            }}
          >
            {loopItems.map((item, index) => (
              <div
                className="home-roulette-slide"
                key={`${item.ebay_id || item.id}-${index}`}
                style={{ width: slotWidth || undefined, marginRight: GAP_PX }}
              >
                <FeaturedListingCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CharityItemRoulette;
