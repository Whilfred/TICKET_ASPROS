// Icônes catégories
const IcGrid = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const IcMusic = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const IcPalette = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C12.83 22 13.5 21.33 13.5 20.5C13.5 20.11 13.35 19.76 13.11 19.49C12.88 19.23 12.73 18.88 12.73 18.5C12.73 17.67 13.4 17 14.23 17H16C19.31 17 22 14.31 22 11C22 6.03 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
    <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor"/>
    <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor"/>
    <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
  </svg>
);

const IcGradCap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M22 9L12 5L2 9L12 13L22 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M6 11V16C6 16 8 19 12 19C16 19 18 16 18 16V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M22 9V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IcCocktail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 3H18L13 10V19H15M9 10V19H11M9 19H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const IcPlane = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 15.5L3 8.5L5 12.5L3 16.5L21 15.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 11.5L7.5 7L10.5 8L13 4.5L14.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IcSportBall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 3C12 3 15 7 15 12C15 17 12 21 12 21" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const IcFestival = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 20L8 9L12 14L16 7L20 20H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 5V3M7.5 6.5L6 5M16.5 6.5L18 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export const CATEGORIES = [
  { id: 'all',       label: 'Toutes',    Icon: IcGrid },
  { id: 'concert',   label: 'Concert',   Icon: IcMusic },
  { id: 'culture',   label: 'Culture',   Icon: IcPalette },
  { id: 'formation', label: 'Formation', Icon: IcGradCap },
  { id: 'soiree',    label: 'Soirée',    Icon: IcCocktail },
  { id: 'tourisme',  label: 'Tourisme',  Icon: IcPlane },
  { id: 'sport',     label: 'Sport',     Icon: IcSportBall },
  { id: 'festival',  label: 'Festival',  Icon: IcFestival },
];