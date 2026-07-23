import React from 'react';
import { Heart, Calendar, Sparkles, MapPin } from 'lucide-react';

export const StoryTimeline = ({ brideName = "Subhana", groomName = "Saad" }) => {
  const stories = [
    {
      date: 'Autumn 2023',
      title: 'The First Spark',
      description: 'A chance meeting at a cozy coffee house turned into hours of endless conversation. We knew from the very first day that something beautiful was blossoming.',
      icon: '✨'
    },
    {
      date: 'Spring 2024',
      title: 'First Unforgettable Date',
      description: 'Strolling through the moonlit gardens under starry skies. Laughter filled the air as we shared our dreams, favorite songs, and secret hopes.',
      icon: '🌙'
    },
    {
      date: 'Summer 2025',
      title: 'The Magical Proposal',
      description: `With the sunset painting the ocean in gold, ${groomName} got down on one knee and asked ${brideName} to be his forever. With tears of joy, she said YES!`,
      icon: '💍',
      image: '/proposal_moment.png'
    },
    {
      date: 'November 2026',
      title: 'Forever Begins Now',
      description: 'Surrounded by our beloved family and dearest friends, we write our forever chapter as husband and wife.',
      icon: '🏰'
    }
  ];

  return (
    <section id="story" style={{
      padding: '80px 20px',
      maxWidth: '900px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
          <Sparkles size={16} /> Our Journey <Sparkles size={16} />
        </div>
        <h2 className="font-heading gold-text" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          How Our Love Story Unfolded
        </h2>
      </div>

      {/* Vertical Timeline Container */}
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* Timeline Center Gold Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '35px',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, #d4af37 20%, #d4af37 80%, transparent)'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {stories.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              gap: '24px',
              position: 'relative',
              alignItems: 'flex-start'
            }}>
              {/* Timeline Icon Badge */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #aa771c)',
                color: '#2b070d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: '700',
                boxShadow: '0 0 15px rgba(212,175,55,0.6)',
                zIndex: 2,
                flexShrink: 0,
                marginTop: '10px'
              }}>
                {item.icon}
              </div>

              {/* Story Content Glass Card */}
              <div className="glass-card" style={{
                flex: 1,
                padding: '24px',
                position: 'relative',
                borderRadius: '18px'
              }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#d4af37',
                  display: 'inline-block',
                  marginBottom: '6px'
                }}>
                  {item.date}
                </span>

                <h3 className="font-heading" style={{
                  fontSize: '1.6rem',
                  color: '#fcf6ba',
                  marginBottom: '10px'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#faf5eb',
                  lineHeight: '1.6',
                  opacity: 0.9
                }}>
                  {item.description}
                </p>

                {item.image && (
                  <div style={{
                    marginTop: '16px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    maxHeight: '220px',
                    border: '1px solid rgba(212,175,55,0.4)'
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
