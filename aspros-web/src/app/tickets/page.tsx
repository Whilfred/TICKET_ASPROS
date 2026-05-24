"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './tickets.module.css';

interface TicketData {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventCategory: string;
  quantity: number;
  pricePaid: string;
  qrCodeValue: string;
  purchaseDate: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);

  useEffect(() => {
    // Load tickets from localStorage
    const localTickets = localStorage.getItem('aspros_tickets');
    if (localTickets) {
      setTickets(JSON.parse(localTickets));
    } else {
      // Inject a default mock ticket if none exists, so the page is never empty
      const defaultTicket: TicketData = {
        ticketId: 'ASP-583921',
        eventId: '1',
        eventTitle: 'Festival Afrobeat 2026',
        eventDate: 'Mercredi 15 Juillet • 18:00',
        eventLocation: 'Stade de l\'Amitié, Cotonou',
        eventCategory: 'Festival',
        quantity: 1,
        pricePaid: '15 000 FCFA',
        qrCodeValue: 'ASPROS_TICKET_1_DEFAULT_MOCK',
        purchaseDate: '24/05/2026'
      };
      setTickets([defaultTicket]);
      localStorage.setItem('aspros_tickets', JSON.stringify([defaultTicket]));
    }
  }, []);

  const handleOpenTicket = (ticket: TicketData) => {
    setSelectedTicket(ticket);
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.pageTitle}>Mes Billets</h1>
        <span className={styles.ticketCount}>{tickets.length} Actif{tickets.length > 1 ? 's' : ''}</span>
      </div>

      <p className={styles.subtitle}>
        Présentez vos QR Codes à l'entrée des événements pour valider votre accès.
      </p>

      {tickets.length > 0 ? (
        <div className={styles.ticketsList}>
          {tickets.map((ticket) => (
            <div 
              key={ticket.ticketId} 
              className={`${styles.ticketCard} animate-fade-in`}
              onClick={() => handleOpenTicket(ticket)}
            >
              {/* Ticket Left Part: Details */}
              <div className={styles.ticketMain}>
                <span className={styles.badge}>{ticket.eventCategory}</span>
                <h3 className={styles.eventTitle}>{ticket.eventTitle}</h3>
                <p className={styles.eventDate}>📅 {ticket.eventDate}</p>
                <p className={styles.eventLocation}>📍 {ticket.eventLocation.split(',')[0]}</p>
                <div className={styles.ticketFooter}>
                  <span>Quantité: <strong>{ticket.quantity}</strong></span>
                  <span className={styles.pricePaid}>{ticket.pricePaid}</span>
                </div>
              </div>

              {/* Dotted Tear Line with cut-out holes */}
              <div className={styles.divider}>
                <div className={styles.circleTop}></div>
                <div className={styles.dashedLine}></div>
                <div className={styles.circleBottom}></div>
              </div>

              {/* Ticket Right Part: Mini Code / Scan Prompt */}
              <div className={styles.ticketStub}>
                <div className={styles.miniQrIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <span className={styles.stubText}>TAP TO SCAN</span>
                <span className={styles.stubId}>{ticket.ticketId}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎫</div>
          <h3>Aucun billet disponible</h3>
          <p>Vous n'avez pas encore acheté de billets d'événements.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: '16px' }}>
            Découvrir les événements
          </Link>
        </div>
      )}

      {/* Expanded Ticket Modal with Scanning QR Code Animation */}
      {selectedTicket && (
        <div className="bottom-sheet-overlay" onClick={handleCloseTicket}>
          <div className={`bottom-sheet ${styles.modalSheet}`} onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" onClick={handleCloseTicket}></div>
            
            <div className={styles.modalContent}>
              <span className={styles.statusIndicator}>
                <span className={styles.statusDot}></span>
                Billet Actif - Prêt à Scanner
              </span>

              <h2 className={styles.modalTitle}>{selectedTicket.eventTitle}</h2>
              <p className={styles.modalDate}>{selectedTicket.eventDate}</p>

              {/* Animated QR Code Box */}
              <div className={styles.qrContainer}>
                {/* Mock QR Code Pattern */}
                <div className={styles.qrCodePattern}>
                  {/* Outer corner squares */}
                  <div className={`${styles.qrSquare} ${styles.qrTopLeft}`}></div>
                  <div className={`${styles.qrSquare} ${styles.qrTopRight}`}></div>
                  <div className={`${styles.qrSquare} ${styles.qrBottomLeft}`}></div>
                  
                  {/* Random inner data blocks to simulate a QR code */}
                  <div className={styles.qrInnerBlock} style={{ top: '35%', left: '35%', width: '12%', height: '12%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '35%', left: '55%', width: '8%', height: '15%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '55%', left: '35%', width: '15%', height: '8%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '55%', left: '55%', width: '10%', height: '10%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '45%', left: '45%', width: '10%', height: '10%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '25%', left: '45%', width: '6%', height: '6%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '45%', left: '25%', width: '6%', height: '6%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '68%', left: '45%', width: '10%', height: '6%' }}></div>
                  <div className={styles.qrInnerBlock} style={{ top: '45%', left: '68%', width: '6%', height: '10%' }}></div>
                </div>

                {/* Laser Scanning Line */}
                <div className={styles.qrScannerLaser}></div>
              </div>

              {/* Security info and Reference */}
              <div className={styles.ticketDetailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>N° DE BILLET</span>
                  <span className={styles.detailValue}>{selectedTicket.ticketId}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>QUANTITÉ</span>
                  <span className={styles.detailValue}>{selectedTicket.quantity} Place{selectedTicket.quantity > 1 ? 's' : ''}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>MONTANT PAYÉ</span>
                  <span className={styles.detailValue}>{selectedTicket.pricePaid}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>DATE D'ACHAT</span>
                  <span className={styles.detailValue}>{selectedTicket.purchaseDate}</span>
                </div>
              </div>

              <div className={styles.securityHash}>
                SECURE HASH: {selectedTicket.qrCodeValue.substring(0, 16)}...
              </div>

              <button onClick={handleCloseTicket} className="btn-secondary" style={{ width: '100%', height: '48px', marginTop: '10px' }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
