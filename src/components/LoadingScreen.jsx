import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const LoadingScreen = ({ onComplete, brideName = "Subhana", groomName = "Saad" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'radial-gradient(circle at center, #59101d 0%, #2a050b 80%, #150205 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#faf5eb',
      padding: '20px'
    }}>
      {/* Decorative Golden Ring Monogram */}
      <div style={{
        position: 'relative',
        width: '160px',
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        {/* Animated Progress Ring SVG */}
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle
            cx="90"
            cy="90"
            r="80"
            stroke="rgba(212, 175, 55, 0.2)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="90"
            cy="90"
            r="80"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            fill="none"
            strokeDasharray={502.6}
            strokeDashoffset={502.6 - (502.6 * progress) / 100}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bf953f" />
              <stop offset="50%" stopColor="#fcf6ba" />
              <stop offset="100%" stopColor="#aa771c" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Monogram Initials */}
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span className="font-calligraphy" style={{
            fontSize: '2.8rem',
            color: '#f3e5ab',
            textShadow: '0 0 15px rgba(212,175,55,0.6)',
            lineHeight: '1.1'
          }}>
            {brideName[0]} <span style={{ fontSize: '1.8rem', color: '#e8c39e' }}>&</span> {groomName[0]}
          </span>
          <Heart size={16} fill="#e84a5f" color="#e84a5f" style={{ marginTop: '4px' }} className="float-slow" />
        </div>
      </div>

      {/* Loading Title & Progress Bar */}
      <h2 className="font-heading" style={{
        fontSize: '1.8rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#fcf6ba',
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        {brideName} & {groomName}
      </h2>

      <p className="font-calligraphy" style={{
        fontSize: '1.4rem',
        color: '#e8c39e',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Sparkles size={16} color="#d4af37" /> Preparing Royal Invitation...
      </p>

      {/* Progress Percentage Indicator */}
      <div style={{
        width: '200px',
        height: '4px',
        background: 'rgba(212, 175, 55, 0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #bf953f, #fcf6ba, #aa771c)',
          borderRadius: '10px',
          transition: 'width 0.1s linear'
        }} />
      </div>

      <span style={{ fontSize: '0.85rem', color: '#8c7377', marginTop: '8px', letterSpacing: '1px' }}>
        {progress}%
      </span>
    </div>
  );
};
