import { useState, useEffect } from 'react';

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);
  const [leftGlitch, setLeftGlitch] = useState(null);
  const [rightGlitch, setRightGlitch] = useState(null);

  const glitchEffects = [
    { opacity: 0.1 },
    { opacity: 0, transform: 'translateX(3px)' },
    { opacity: 0.8, transform: 'translateX(-2px) skewX(10deg)' },
    { opacity: 0.5, transform: 'translateY(-2px) scaleY(1.3)' },
    { opacity: 0.9, transform: 'translateX(1px) translateY(1px)' },
    { opacity: 0, transform: 'scaleX(0.5)' },
    { opacity: 0.7, transform: 'skewX(-15deg) translateX(-3px)' },
  ];

  const triggerGlitch = (setter) => {
    const burstCount = 2 + Math.floor(Math.random() * 4);
    let delay = 0;
    
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        setter(glitchEffects[Math.floor(Math.random() * glitchEffects.length)]);
      }, delay);
      
      delay += 50 + Math.random() * 80;
      
      setTimeout(() => {
        setter(null);
      }, delay);
      
      delay += 30 + Math.random() * 50;
    }
  };

  useEffect(() => {
    setMounted(true);
    
    const flickerLeft = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerGlitch(setLeftGlitch);
      }
    }, 1200 + Math.random() * 800);

    const flickerRight = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerGlitch(setRightGlitch);
      }
    }, 1400 + Math.random() * 800);

    return () => {
      clearInterval(flickerLeft);
      clearInterval(flickerRight);
    };
  }, []);

  const getSmileyStyle = (glitchState) => ({
    display: 'inline-block',
    fontSize: '1.5em',
    verticalAlign: 'middle',
    position: 'relative',
    opacity: glitchState?.opacity ?? 1,
    transform: glitchState?.transform ?? 'none',
    transition: glitchState ? 'none' : 'all 50ms',
    textShadow: glitchState 
      ? '2px 0 #00ffff, -2px 0 #ff0066' 
      : 'none',
  });

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: '#000000',
      }}
    >
      {/* Fortune slip - white paper */}
      <div 
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          maxWidth: '500px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 1s ease',
          boxShadow: '0 0 60px rgba(196, 30, 30, 0.15)',
        }}
      >
        {/* Red border inside the paper */}
        <div
          style={{
            border: '3px solid #c41e1e',
            padding: '24px 32px',
          }}
        >
          {/* Fortune text */}
          <p 
            style={{
              color: '#c41e1e',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
              lineHeight: 1.6,
              textAlign: 'center',
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            <span style={getSmileyStyle(leftGlitch)}>☻</span>
            {' '}Something is coming.
            <br />
            I can't say more at this time.{' '}
            <span style={getSmileyStyle(rightGlitch)}>☻</span>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');
      `}</style>
    </div>
  );
}
