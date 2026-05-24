import { useState } from 'react';
import { IcCalendar, IcClock, IcPin, IcHeart, IcShare, IcTicketBuy, IcCheck } from '../common/Icons';

export const EventCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(event.likes);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(v => !v);
    setLikeCount(n => liked ? n - 1 : n + 1);
  };

  return (
    <article className="event-card">
      <div className="card-img-wrapper">
        <img src={event.image} alt={event.title} className="card-img" loading="lazy" />

        {event.live
          ? <div className="badge-live">EN COURS</div>
          : event.verified && (
            <div className="badge-verified" aria-label="Vérifié"><IcCheck /></div>
          )
        }

        <div className="badge-cat" style={{ background: event.catColor }}>
          {event.catLabel}
        </div>

        <div className="card-actions">
          <button className="card-action-btn" onClick={toggleLike} aria-label="J'aime">
            <IcHeart active={liked} />
          </button>
          <button className="card-action-btn" aria-label="Partager">
            <IcShare />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>

        <div className="card-meta">
          <div className="card-info-row">
            <IcCalendar color="#1a6cf0" />
            <span>{event.date}</span>
          </div>
          <div className="card-info-row">
            <IcClock />
            <span>{event.time}</span>
          </div>
          <div className="card-info-row">
            <IcPin color="#888" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="card-pricing">
          <p className="price-main">{event.price}</p>
          <div className="price-tags">
            {event.prices.map((p, i) => (
              <span key={i} className="price-tag">{p}</span>
            ))}
          </div>
        </div>

        <button className="btn-buy">
          <IcTicketBuy /> Acheter tickets
        </button>

        <div className="card-footer">
          <div className="publisher">
            <div className="publisher-avatar">{event.publisher[0]}</div>
            <span className="publisher-name">{event.publisher}</span>
          </div>
          <button className="likes-btn" onClick={toggleLike}>
            <IcHeart active={liked} />
            <span>{likeCount.toLocaleString('fr-FR')}</span>
          </button>
        </div>
      </div>
    </article>
  );
};