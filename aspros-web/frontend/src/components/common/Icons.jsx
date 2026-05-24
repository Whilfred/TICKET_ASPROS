// Icône Ticket
export const IcTicket = ({ size = 20, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2 9.5C2 8.95 2.45 8.5 3 8.5H4C4 7.4 4.9 6.5 6 6.5H18C19.1 6.5 20 7.4 20 8.5H21C21.55 8.5 22 8.95 22 9.5V10.5C22 11.33 21.33 12 20.5 12C21.33 12 22 12.67 22 13.5V14.5C22 15.05 21.55 15.5 21 15.5H20C20 16.6 19.1 17.5 18 17.5H6C4.9 17.5 4 16.6 4 15.5H3C2.45 15.5 2 15.05 2 14.5V13.5C2 12.67 1.33 12 2 12C1.33 12 2 11.33 2 10.5V9.5Z" fill={color} opacity="0.92"/>
    <line x1="9" y1="6.5" x2="9" y2="17.5" stroke="#1a6cf0" strokeWidth="1.5" strokeDasharray="2 2"/>
    <line x1="15" y1="6.5" x2="15" y2="17.5" stroke="#1a6cf0" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

export const IcHeart = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z" fill={active ? '#ef4444' : 'none'} stroke={active ? '#ef4444' : '#aaa'} strokeWidth="1.7"/>
  </svg>
);

export const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IcSearch = ({ color = '#1a6cf0' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
    <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IcFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M7 12h10M11 18h2" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IcPin = ({ color = '#1a6cf0' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.69 2 6 4.69 6 8C6 12.5 12 22 12 22C12 22 18 12.5 18 8C18 4.69 15.31 2 12 2Z" stroke={color} strokeWidth="1.8"/>
    <circle cx="12" cy="8" r="2.5" stroke={color} strokeWidth="1.8"/>
  </svg>
);

export const IcChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IcUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3.5" stroke="#555" strokeWidth="1.6"/>
    <path d="M2 20C2 17 5.13 14 9 14C12.87 14 16 17 16 20" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M17 11C18.66 11 20 9.66 20 8C20 6.34 18.66 5 17 5M22 20C22 17.5 20.5 15.5 18 14.5" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 8C18 4.69 15.31 2 12 2C8.69 2 6 4.69 6 8C6 14 3 16 3 16H21C21 16 18 14 18 8Z" stroke="#555" strokeWidth="1.6"/>
    <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export const IcUser = ({ size = 22, color = '#555' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6"/>
    <circle cx="12" cy="9" r="3" stroke={color} strokeWidth="1.6"/>
    <path d="M5.5 20C5.5 17 8.46 15 12 15C15.54 15 18.5 17 18.5 20" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcHome = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill={active ? '#1a6cf0' : 'none'} stroke={active ? '#1a6cf0' : '#aaa'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IcCalendar = ({ color = '#888' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="1.6"/>
    <path d="M3 9H21" stroke={color} strokeWidth="1.6"/>
    <path d="M8 2V6M16 2V6" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#888" strokeWidth="1.6"/>
    <path d="M12 7V12L15 15" stroke="#888" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

export const IcShare = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="3" stroke="#555" strokeWidth="1.6"/>
    <circle cx="6" cy="12" r="3" stroke="#555" strokeWidth="1.6"/>
    <circle cx="18" cy="19" r="3" stroke="#555" strokeWidth="1.6"/>
    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="#555" strokeWidth="1.6"/>
  </svg>
);

export const IcTicketBuy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M2 9.5C2 8.95 2.45 8.5 3 8.5H4C4 7.4 4.9 6.5 6 6.5H18C19.1 6.5 20 7.4 20 8.5H21C21.55 8.5 22 8.95 22 9.5V10.5C22 11.33 21.33 12 20.5 12C21.33 12 22 12.67 22 13.5V14.5C22 15.05 21.55 15.5 21 15.5H20C20 16.6 19.1 17.5 18 17.5H6C4.9 17.5 4 16.6 4 15.5H3C2.45 15.5 2 15.05 2 14.5V13.5C2 12.67 1.33 12 2 12C1.33 12 2 11.33 2 10.5V9.5Z" stroke="white" strokeWidth="1.6"/>
    <line x1="9" y1="6.5" x2="9" y2="17.5" stroke="white" strokeWidth="1.4" strokeDasharray="2 2"/>
    <line x1="15" y1="6.5" x2="15" y2="17.5" stroke="white" strokeWidth="1.4" strokeDasharray="2 2"/>
  </svg>
);