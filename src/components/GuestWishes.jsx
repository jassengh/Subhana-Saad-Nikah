import React, { useState } from 'react';
import { MessageSquare, Heart, Send, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GuestWishes = ({ brideName = "Subhana", groomName = "Saad", recipientEmail = "navelaindustries@gmail.com" }) => {
  const [wishes, setWishes] = useState([
    {
      name: 'Aisha & Family',
      message: `Wishing ${brideName} & ${groomName} a lifetime of endless joy, laughter, and unconditional love! So excited to celebrate with you!`,
      date: 'Just now'
    },
    {
      name: 'Zayd & Omar',
      message: 'May your bond grow stronger with each passing day. Mubarak on this magnificent union!',
      date: '2 hours ago'
    },
    {
      name: 'Uncle Farhan & Aunt Sana',
      message: 'Sending our heartiest blessings to the beautiful couple. May Allah bless your marriage with endless happiness.',
      date: '5 hours ago'
    }
  ]);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);

    const newWish = {
      name: name.trim(),
      message: message.trim(),
      date: 'Just now'
    };

    // Update state live on wall
    setWishes([newWish, ...wishes]);

    // Send formatted email copy to navelaindustries@gmail.com
    const emailPayload = {
      _subject: `💌 New Wedding Blessing from ${name.trim()}`,
      Bride_And_Groom: `${brideName} & ${groomName}`,
      Guest_Name: name.trim(),
      Blessing_Message: message.trim(),
      Submitted_At: new Date().toLocaleString()
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });
    } catch (err) {
      console.warn('FormSubmit email fallback:', err);
    } finally {
      setIsSending(false);
      setName('');
      setMessage('');

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#e84a5f', '#d4af37', '#ffffff']
      });
    }
  };

  return (
    <section id="wishes" style={{
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
          <MessageSquare size={16} /> Well Wishes Wall <MessageSquare size={16} />
        </div>
        <h2 className="font-heading gold-text" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          Leave a Blessing for the Couple
        </h2>
        <p className="font-calligraphy" style={{ fontSize: '1.6rem', color: '#e8c39e', marginTop: '4px' }}>
          Your love and prayers mean the world to us
        </p>
      </div>

      {/* Write a Wish Form Card */}
      <div className="glass-card" style={{
        padding: '28px',
        borderRadius: '24px',
        marginBottom: '40px',
        border: '2px solid rgba(212, 175, 55, 0.4)'
      }}>
        <form onSubmit={handleSubmitWish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              Your Name / Family Name
            </label>
            <input
              type="text"
              placeholder="e.g. Fatima & Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #d4af37',
                background: 'rgba(42, 5, 11, 0.6)',
                color: '#fff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              Your Loving Message & Blessings
            </label>
            <textarea
              rows="3"
              placeholder={`Write your warm wishes for ${brideName} & ${groomName}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #d4af37',
                background: 'rgba(42, 5, 11, 0.6)',
                color: '#fff',
                fontSize: '0.95rem',
                resize: 'none'
              }}
            />
          </div>

          <button type="submit" disabled={isSending} className="gold-button" style={{ alignSelf: 'flex-start' }}>
            {isSending ? (
              <>Sending Blessing...</>
            ) : (
              <>
                <Send size={18} /> Send Blessings to Email & Wall ❤️
              </>
            )}
          </button>
        </form>
      </div>

      {/* Grid of Submitted Wishes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {wishes.map((w, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: '20px',
            borderRadius: '18px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={16} fill="#e84a5f" color="#e84a5f" />
                <h4 className="font-heading" style={{ fontSize: '1.2rem', color: '#fcf6ba' }}>
                  {w.name}
                </h4>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#8c7377' }}>{w.date}</span>
            </div>

            <p style={{
              fontSize: '0.9rem',
              color: '#faf5eb',
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              "{w.message}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
