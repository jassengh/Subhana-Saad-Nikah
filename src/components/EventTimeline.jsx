import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Shirt } from 'lucide-react';

export const EventTimeline = () => {
  const events = [
    {
      title: 'Haldi Ceremony',
      subtitle: 'A Splash of Sunshine & Blessings',
      date: 'Thursday, 6 August 2026',
      time: '07:00 PM onwards',
      location: 'At Home',
      dressCode: 'Traditional Mustard & Sunshine Yellow',
      color: '#ffd700',
      badge: '💛 Haldi'
    },
    {
      title: 'Mehendi & Sangeet Night',
      subtitle: 'Henna, Beats & Festive Celebration',
      date: 'Friday, 7 August 2026',
      time: '07:00 PM onwards',
      location: 'At Home',
      dressCode: 'Traditional Green & Floral Attire',
      color: '#2e8b57',
      badge: '💃 Mehendi & Sangeet'
    },
    {
      title: 'Sacred Nikah Ceremony',
      subtitle: '“And among His signs is that He created for you mates...” — Qur’an 30:21',
      date: 'Saturday, 8 August 2026',
      time: '08:00 PM onwards',
      location: 'The Park Crown Banquet, Kaushambi',
      dressCode: 'Royal Velvet & Gold Ethnic Attire',
      color: '#d4af37',
      badge: '💍 Main Nikah Event'
    }
  ];

  const addToGoogleCalendar = (event) => {
    const title = encodeURIComponent(event.title + ' - Saad & Subhana');
    const details = encodeURIComponent(event.subtitle + '\nDress Code: ' + event.dressCode);
    const location = encodeURIComponent(event.location);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section id="events" style={{
      padding: '80px 20px',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#d4af37',
          fontSize: '0.85rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          <Calendar size={16} /> Celebrations Schedule <Calendar size={16} />
        </div>
        <h2 className="font-heading gold-text" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          Wedding Events & Functions
        </h2>
        <p className="font-calligraphy" style={{ fontSize: '1.6rem', color: '#e8c39e', marginTop: '4px' }}>
          Your presence, blessings, and prayers will make our celebration complete ❤
        </p>
      </div>

      {/* Grid of Event Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {events.map((evt, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: '28px',
            borderRadius: '24px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: `4px solid ${evt.color}`,
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
            transition: 'transform 0.3s ease'
          }}>
            <div>
              {/* Event Badge */}
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'rgba(212, 175, 55, 0.2)',
                color: evt.color,
                padding: '4px 12px',
                borderRadius: '20px',
                border: `1px solid ${evt.color}`,
                display: 'inline-block',
                marginBottom: '14px'
              }}>
                {evt.badge}
              </span>

              <h3 className="font-heading" style={{
                fontSize: '1.8rem',
                color: '#fcf6ba',
                marginBottom: '4px'
              }}>
                {evt.title}
              </h3>

              <p className="font-calligraphy" style={{
                fontSize: '1.3rem',
                color: '#e8c39e',
                marginBottom: '18px'
              }}>
                {evt.subtitle}
              </p>

              {/* Event Details List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.9rem',
                color: '#faf5eb',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} color="#d4af37" />
                  <span>{evt.date}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#d4af37" />
                  <span>{evt.time}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="#d4af37" />
                  <span>{evt.location}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shirt size={16} color="#d4af37" />
                  <span style={{ fontStyle: 'italic', color: '#e8c39e' }}>{evt.dressCode}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => addToGoogleCalendar(evt)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '50px',
                border: '1px solid #d4af37',
                background: 'rgba(212, 175, 55, 0.15)',
                color: '#fcf6ba',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={14} color="#d4af37" /> Add to Google Calendar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
