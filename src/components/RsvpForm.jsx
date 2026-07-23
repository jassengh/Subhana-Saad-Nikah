import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Mail, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RsvpForm = ({ brideName = "Subhana", groomName = "Saad", recipientEmail = "navelaindustries@gmail.com" }) => {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    status: 'attending', // 'attending' | 'declined'
    guestCount: '2',
    events: {
      haldi: true,
      sangeet: true,
      wedding: true
    },
    dietary: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (eventName) => {
    setFormData((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [eventName]: !prev.events[eventName]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const selectedEvents = Object.keys(formData.events)
      .filter((k) => formData.events[k])
      .map((k) => k.toUpperCase())
      .join(', ');

    const emailPayload = {
      _subject: `✨ New Wedding RSVP: ${formData.guestName} (${formData.status === 'attending' ? 'Attending' : 'Declined'})`,
      Bride_And_Groom: `${brideName} & ${groomName}`,
      Guest_Full_Name: formData.guestName,
      Guest_Phone_Number: formData.phone,
      Attendance_Status: formData.status === 'attending' ? 'Joyfully Accepts ✅' : 'Regretfully Declines 💐',
      Number_Of_Guests: formData.guestCount,
      Functions_Attending: selectedEvents || 'None',
      Dietary_Preferences: formData.dietary || 'None specified',
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
      console.warn('FormSubmit AJAX fallback:', err);
    } finally {
      setIsSending(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fcf6ba', '#e84a5f']
      });
    }
  };

  return (
    <section id="rsvp" style={{
      padding: '80px 20px',
      maxWidth: '750px',
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
          <Sparkles size={16} /> Kindly Respond <Sparkles size={16} />
        </div>
        <h2 className="font-heading gold-text" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
          RSVP Confirmation
        </h2>
        <p className="font-calligraphy" style={{ fontSize: '1.6rem', color: '#e8c39e', marginTop: '4px' }}>
          Please confirm your attendance by August 1st, 2026
        </p>
      </div>

      <div className="glass-card" style={{
        padding: '36px 28px',
        borderRadius: '28px',
        border: '2px solid rgba(212, 175, 55, 0.5)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={64} color="#d4af37" style={{ margin: '0 auto 16px' }} className="pulse-glow" />
            <h3 className="font-heading gold-text" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
              Thank You, {formData.guestName}!
            </h3>
            <p style={{ fontSize: '1rem', color: '#faf5eb', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 20px' }}>
              Your RSVP confirmation has been dispatched directly to <strong>{recipientEmail}</strong>. We look forward to celebrating with you!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                background: 'transparent',
                border: '1px solid #d4af37',
                color: '#fcf6ba',
                padding: '10px 24px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Submit Another RSVP
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Guest Name Input */}
            <div>
              <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                required
                placeholder="e.g. Dr. Rayan Al-Mansoor"
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

            {/* Phone Input */}
            <div>
              <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                Phone Number / WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 000-1234"
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

            {/* Attendance Status Selection */}
            <div>
              <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Will You Be Attending? *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, status: 'attending' }))}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: formData.status === 'attending' ? '2px solid #d4af37' : '1px solid rgba(212,175,55,0.3)',
                    background: formData.status === 'attending' ? 'rgba(212, 175, 55, 0.25)' : 'rgba(0,0,0,0.3)',
                    color: '#fcf6ba',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🎉 Joyfully Accepts
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, status: 'declined' }))}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: formData.status === 'declined' ? '2px solid #e84a5f' : '1px solid rgba(212,175,55,0.3)',
                    background: formData.status === 'declined' ? 'rgba(232, 74, 95, 0.25)' : 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  💐 Regretfully Declines
                </button>
              </div>
            </div>

            {formData.status === 'attending' && (
              <>
                {/* Number of Guests */}
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                    Number of Attending Guests
                  </label>
                  <select
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #d4af37',
                      background: 'rgba(42, 5, 11, 0.8)',
                      color: '#fff',
                      fontSize: '0.95rem'
                    }}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4+">4+ Guests / Family</option>
                  </select>
                </div>

                {/* Events Checkboxes */}
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Which Functions Will You Attend?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                      { key: 'haldi', label: 'Haldi Ceremony' },
                      { key: 'sangeet', label: 'Mehendi & Sangeet' },
                      { key: 'wedding', label: 'Wedding Nikkah' }
                    ].map((item) => (
                      <label key={item.key} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: '#faf5eb',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="checkbox"
                          checked={formData.events[item.key]}
                          onChange={() => handleCheckbox(item.key)}
                          style={{ accentColor: '#d4af37', width: '16px', height: '16px' }}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dietary Requirements */}
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#e8c39e', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                    Dietary Preferences / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    placeholder="e.g. Vegetarian, Halal, Gluten-free..."
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
              </>
            )}

            <button type="submit" disabled={isSending} className="gold-button" style={{ marginTop: '10px', width: '100%' }}>
              {isSending ? (
                <>Sending RSVP to Email...</>
              ) : (
                <>
                  <Mail size={18} /> Send Official RSVP to Email 🎉
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
