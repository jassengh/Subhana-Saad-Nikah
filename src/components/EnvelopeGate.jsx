import React, { useState } from 'react';
import { Heart, Sparkles, Volume2, Lock } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const EnvelopeGate = ({ onOpenComplete, brideName = "Subhana", groomName = "Saad" }) => {
  const [stage, setStage] = useState('sealed'); // 'sealed' | 'opening' | 'unfolding' | 'opened'

  const handleOpenDoors = () => {
    if (stage !== 'sealed') return;

    // Trigger Sound FX, Chime & Speech Synthesis Voice Greeting
    soundManager.playChime();
    soundManager.playPaperRustle();
    soundManager.speakWelcome(groomName);
    soundManager.startRomanticBGM();

    // Sequence opening stages
    setStage('opening');

    setTimeout(() => {
      setStage('unfolding');
    }, 1200);

    setTimeout(() => {
      setStage('opened');
      if (onOpenComplete) onOpenComplete();
    }, 2800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9000,
      background: 'radial-gradient(circle at center, #59101d 0%, #2a050b 80%, #150205 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflow: 'hidden',
      opacity: stage === 'opened' ? 0 : 1,
      pointerEvents: stage === 'opened' ? 'none' : 'auto',
      transition: 'opacity 1s ease-in-out'
    }}>

      {/* Top Banner Notice */}
      <div style={{
        position: 'absolute',
        top: '25px',
        textAlign: 'center',
        zIndex: 10,
        width: '90%',
        maxWidth: '480px'
      }}>
        <p className="font-calligraphy" style={{
          fontSize: '2rem',
          color: '#fcf6ba',
          textShadow: '0 2px 15px rgba(0,0,0,0.8)'
        }}>
          Royal Wedding Gate & Invitation
        </p>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#e8c39e',
          marginTop: '4px'
        }}>
          Tap the Center Wax Seal to Open
        </p>
      </div>

      {/* 3D Double Gate / Curtain Door Frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        height: '320px',
        perspective: '1200px',
        margin: 'auto 0'
      }}>

        {/* Inner Parchment Invitation Letter (Revealed Behind Doors) */}
        <div style={{
          position: 'absolute',
          inset: '10px',
          background: '#faf5eb',
          color: '#2c1a1d',
          borderRadius: '16px',
          padding: '24px 20px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
          border: '2px solid #d4af37',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: stage === 'unfolding' || stage === 'opened' ? 'scale(1.03)' : 'scale(0.95)',
          transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 1
        }}>
          <div style={{ fontSize: '1.1rem', color: '#d4af37', marginBottom: '2px' }}>
            ❖ ─── ✦ ─── ❖
          </div>

          <p className="font-calligraphy" style={{ fontSize: '1.8rem', color: '#59101d', marginBottom: '2px' }}>
            Together with their families
          </p>

          <h1 className="font-heading" style={{
            fontSize: '2.4rem',
            fontWeight: '700',
            color: '#a27b14',
            margin: '4px 0'
          }}>
            {brideName} <span className="font-calligraphy" style={{ fontSize: '2rem', color: '#e84a5f' }}>&</span> {groomName}
          </h1>

          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#8c7377',
            marginTop: '4px'
          }}>
            Cordially invite you to celebrate their wedding
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            color: '#d4af37',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            <Sparkles size={16} /> <span>Save The Date: Aug 8, 2026</span> <Sparkles size={16} />
          </div>

          <div style={{ fontSize: '1.1rem', color: '#d4af37', marginTop: '6px' }}>
            ❖ ─── ✦ ─── ❖
          </div>
        </div>

        {/* LEFT DOOR FLAP (Slides / Swings to the Left) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #4a0e17 0%, #2b070d 100%)',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px',
          borderRight: '2px solid #d4af37',
          boxShadow: '10px 0 30px rgba(0,0,0,0.7)',
          transformOrigin: 'left center',
          transform: stage === 'opening' || stage === 'unfolding' || stage === 'opened'
            ? 'translateX(-105%) rotateY(-20deg)'
            : 'translateX(0%) rotateY(0deg)',
          transition: 'transform 1.3s cubic-bezier(0.77, 0, 0.175, 1)',
          zIndex: 3,
          overflow: 'hidden'
        }}>
          {/* Gold Filigree & Damask Texture Pattern on Left Door */}
          <div style={{
            position: 'absolute',
            inset: '12px',
            border: '1px dashed rgba(212, 175, 55, 0.5)',
            borderRadius: '10px 0 0 10px',
            background: 'repeating-linear-gradient(45deg, rgba(212,175,55,0.06) 0, rgba(212,175,55,0.06) 12px, transparent 12px, transparent 24px)'
          }} />
          <div className="font-calligraphy" style={{
            position: 'absolute',
            top: '50%',
            right: '15px',
            transform: 'translateY(-50%)',
            fontSize: '3rem',
            color: 'rgba(212, 175, 55, 0.3)'
          }}>
            {brideName[0]}
          </div>
        </div>

        {/* RIGHT DOOR FLAP (Slides / Swings to the Right) */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(225deg, #4a0e17 0%, #2b070d 100%)',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
          borderLeft: '2px solid #d4af37',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.7)',
          transformOrigin: 'right center',
          transform: stage === 'opening' || stage === 'unfolding' || stage === 'opened'
            ? 'translateX(105%) rotateY(20deg)'
            : 'translateX(0%) rotateY(0deg)',
          transition: 'transform 1.3s cubic-bezier(0.77, 0, 0.175, 1)',
          zIndex: 3,
          overflow: 'hidden'
        }}>
          {/* Gold Filigree & Damask Texture Pattern on Right Door */}
          <div style={{
            position: 'absolute',
            inset: '12px',
            border: '1px dashed rgba(212, 175, 55, 0.5)',
            borderRadius: '0 10px 10px 0',
            background: 'repeating-linear-gradient(-45deg, rgba(212,175,55,0.06) 0, rgba(212,175,55,0.06) 12px, transparent 12px, transparent 24px)'
          }} />
          <div className="font-calligraphy" style={{
            position: 'absolute',
            top: '50%',
            left: '15px',
            transform: 'translateY(-50%)',
            fontSize: '3rem',
            color: 'rgba(212, 175, 55, 0.3)'
          }}>
            {groomName[0]}
          </div>
        </div>

        {/* CENTER WAX SEAL BUTTON (Placed in the exact middle where doors meet) */}
        {stage === 'sealed' && (
          <button
            onClick={handleOpenDoors}
            className="pulse-glow"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '95px',
              height: '95px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #b81424 0%, #70060e 70%, #400206 100%)',
              border: '4px solid #f3e5ab',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.6), inset 0 0 15px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              color: '#fcf6ba',
              transition: 'all 0.3s ease'
            }}
          >
            <Heart size={26} fill="#fcf6ba" color="#fcf6ba" />
            <span className="font-heading" style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              marginTop: '2px',
              textTransform: 'uppercase'
            }}>
              OPEN
            </span>
          </button>
        )}
      </div>

      {/* Bottom Hint Notice */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#e8c39e',
        fontSize: '0.85rem'
      }}>
        <Volume2 size={16} color="#d4af37" />
        <span>Turn on sound for voice greeting & audio</span>
      </div>
    </div>
  );
};
