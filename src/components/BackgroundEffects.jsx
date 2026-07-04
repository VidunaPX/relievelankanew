import React, { useEffect, useRef, useState } from 'react';
import '../styles/waterfall.css';
import mountImg from '../assets/mountainfront.png';
import mountImg2 from '../assets/mountain2.png';
import mountImg3 from '../assets/mountain3.png';
import mountImg4 from '../assets/mountain4.png';
import '../styles/mountain.css';

const BackgroundEffects = () => {
  const canvasRef = useRef(null);
  const atmosphereRef = useRef(null);
  const rippleFlashRef = useRef(null);
  const mountImgRef = useRef(new Image());
  const mountImg2Ref = useRef(new Image());
  const mountImg3Ref = useRef(new Image());
  const mountImg4Ref = useRef(new Image());

  const [themeClass] = useState('mountain-default');

  useEffect(() => {
    mountImgRef.current.src = mountImg;
    mountImg2Ref.current.src = mountImg2;
    mountImg3Ref.current.src = mountImg3;
    mountImg4Ref.current.src = mountImg4;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let W, H;
    let waterFallParticles = [];

    const waterfallConfig = {
      particleCount: 2000, 
      spawnX: () => window.innerWidth * 0.99, 
      spawnY: -400, 
    };

    const resizeCanvas = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    // --- Waterfall Logic ---
    const initWaterfall = () => {
      waterFallParticles = [];
      const currentScroll = window.scrollY;
      // We want the waterfall to exist from spawnY down to the bottom of the screen immediately
      const verticalRange = H + 1200; 

      for (let i = 0; i < waterfallConfig.particleCount; i++) {
        const p = resetParticle({});
        
 
        const progress = i / waterfallConfig.particleCount;
        p.y = waterfallConfig.spawnY + (progress * verticalRange);
        
        // Calculate what the velocity should be at this point in the trajectory
        // Based on gravity accumulation: vy = initial_vy + gravity * time
        const timeToReachY = (p.y - waterfallConfig.spawnY) / 3; // approximate time
        p.vy = 2 + (0.15 * timeToReachY); // initial vy + gravity * time
        
        // Calculate horizontal position based on the arc trajectory
        // x = initial_x + vx * time
        p.x = waterfallConfig.spawnX() + (p.vx * timeToReachY);
        
        waterFallParticles.push(p);
      }
    };

    const resetParticle = (p, fillGap = false) => {
      p.x = waterfallConfig.spawnX() + (Math.random() * 40 - 20);
      
      if (fillGap) {
        // Spawn at random height within visible range to fill gaps
        const currentScroll = window.scrollY;
        const visibleRange = H + 600;
        p.y = waterfallConfig.spawnY + (Math.random() * visibleRange);
        
        // Calculate appropriate velocity for this position
        const timeToReachY = (p.y - waterfallConfig.spawnY) / 3;
        p.vy = 2 + (0.15 * timeToReachY);
        p.x = waterfallConfig.spawnX() + (p.vx * timeToReachY);
      } else {
        // Normal spawn at top
        p.y = waterfallConfig.spawnY;
        p.vx = -5 + Math.random() * 5;
        p.vy = Math.random() * 3 + 2;
      }
      
      p.opacity = Math.random() * 0.4 + 0.2;
      return p;
    };

    const updateWaterfall = () => {
      waterFallParticles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.vy += 0.15; // Gravity

        const currentScroll = window.scrollY;
        
        // RECYCLING: If it leaves the view, reset it
        // 30% chance to fill gaps by spawning at random height, 70% spawn at top
        if (p.y > H + currentScroll + 100) {
          const fillGap = Math.random() < 0.3;
          resetParticle(p, fillGap);
        }
      });
    };

    const drawWaterfall = () => {
      ctx.strokeStyle = 'rgb(255, 255, 255)';
      ctx.lineWidth = 1.2;
      const scrollOffset = window.scrollY;
      
      waterFallParticles.forEach(p => {
        const screenY = p.y - scrollOffset;
        const screenX = p.x;

        if (screenY > -500 && screenY < H + 50) {
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(screenX - p.vx, screenY - p.vy);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Determine reveal progress based on the Donate section position.
      const donateEl = document.getElementById('donate');
      let revealProgress = 0;
      if (donateEl) {
        const donateTop = donateEl.getBoundingClientRect().top + window.scrollY;
        const startReveal = Math.max(0, donateTop - window.innerHeight);
        const range = Math.max(1, window.innerHeight);
        revealProgress = Math.min(Math.max((window.scrollY - startReveal) / range, 0), 1);
      }

      const drawLayer = (imgRef, _speed, yOffset) => {
        if (!imgRef.current || !imgRef.current.complete) return;

        const img = imgRef.current;
        const aspect = img.height / img.width;
        const mWidth = W;
        const mHeight = W * aspect;

        const groundedY = H - mHeight + yOffset;
        const hiddenY = H + 200 + yOffset;

        const t = revealProgress;
        const smooth = t * t * (3 - 2 * t);

        const mountY = hiddenY * (1 - smooth) + groundedY * smooth;
        const pivotX = mWidth / 2;
        const tilt = (1 - smooth) * 0.08;

        ctx.save();
        ctx.translate(pivotX, mountY + mHeight);
        ctx.rotate(-tilt);
        ctx.drawImage(img, -pivotX, -mHeight, mWidth, mHeight);

        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fillRect(-pivotX, -mHeight, mWidth, mHeight);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
      };
      const baseYOffset = 100; // Base offset for the mountains

      drawLayer(mountImg4Ref, 0.05, baseYOffset + 100);
      drawLayer(mountImg3Ref, 0.1, baseYOffset + 150);
      drawLayer(mountImg2Ref, 0.2, baseYOffset + 200);
      drawLayer(mountImgRef, 0.3, baseYOffset + 250);

      // Waterfall paused
      // updateWaterfall();
      // drawWaterfall();

      requestAnimationFrame(render);
    };

    resizeCanvas();
    // initWaterfall(); // Waterfall disabled for now
    // initFireflies();
    const animationId = requestAnimationFrame(render);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={atmosphereRef} id="atmosphere" aria-hidden="true" />
      <div ref={rippleFlashRef} className="ripple-flash" aria-hidden="true" />
      <canvas 
        ref={canvasRef} 
        id="waterfallCanvas" 
        className={themeClass} 
        style={{ 
          position: 'fixed', 
          top: 0,
          left: 0, 
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none' 
        }}
      />
    </>
  );
};

export default BackgroundEffects;