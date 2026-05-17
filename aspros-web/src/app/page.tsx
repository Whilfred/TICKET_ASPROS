import { EventCard, EventData } from '@/components/EventCard';
import styles from './page.module.css';

const MOCK_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Festival Afrobeat 2026',
    date: '15 Juillet 2026 • 18:00',
    location: 'Stade de l\'Amitié',
    category: 'Concert',
    imageUrl: '', // Uses the gradient placeholder
    price: '15 000 FCFA'
  },
  {
    id: '2',
    title: 'Avant-première : Black Panther 3',
    date: '20 Août 2026 • 20:30',
    location: 'Canal Olympia',
    category: 'Cinéma',
    imageUrl: '',
    price: '5 000 FCFA'
  },
  {
    id: '3',
    title: 'Gala de Charité - Enfants Orphelins',
    date: '05 Septembre 2026 • 19:00',
    location: 'Hôtel Azalaï',
    category: 'Solidarité',
    imageUrl: '',
    price: 'Don Libre'
  },
  {
    id: '4',
    title: 'Masterclass : Tech in Africa',
    date: '10 Octobre 2026 • 09:00',
    location: 'Palais des Congrès',
    category: 'Concert', // just for variety
    imageUrl: '',
    price: '25 000 FCFA'
  }
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Vivez l'Événement, <br />
            <span className={styles.highlight}>Autrement.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Découvrez les meilleurs concerts, films, et participez à des collectes solidaires 
            partout en Afrique. La billetterie de nouvelle génération est là.
          </p>
          <div className={styles.heroActions}>
            <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Découvrir les événements
            </button>
          </div>
        </div>
        <div className={styles.heroDecorations}>
          {/* Abstract background shapes */}
          <div className={`${styles.blob} ${styles.blob1}`}></div>
          <div className={`${styles.blob} ${styles.blob2}`}></div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>À la une</h2>
          <div className={styles.filters}>
            <button className={`${styles.filterBtn} ${styles.active}`}>Tous</button>
            <button className={styles.filterBtn}>Concerts</button>
            <button className={styles.filterBtn}>Cinéma</button>
            <button className={styles.filterBtn}>Solidarité</button>
          </div>
        </div>

        <div className={styles.eventsGrid}>
          {MOCK_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
