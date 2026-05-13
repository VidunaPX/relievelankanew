import React, { useEffect, useRef, useState } from 'react';
import '../styles/waterfall.css';
import mountImg from '../assets/mountain.png';
import '../styles/mountain.css';

const BackgroundEffects = () => {
  const canvasRef = useRef(null);
  const atmosphereRef = useRef(null);
  const rippleFlashRef = useRef(null);
  const mountImgRef = useRef(new Image());
  const [themeClass] = useState('mountain-default');

  useEffect(() => {
    mountImgRef.current.src = mountImg;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let W, H;
    let fireflies = [];
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
      const verticalRange = H + 600; 

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
      ctx.strokeStyle = 'rgba(0, 28, 53, 0.7)';
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

    // --- Firefly Logic ---
    const initFireflies = () => {
      fireflies = [];
      for (let i = 0; i < 25; i++) {
        fireflies.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          glow: Math.random(),
          glowSpeed: Math.random() * 0.03 + 0.01
        });
      }
    };

    const updateFireflies = () => {
      fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;
        f.glow += f.glowSpeed;
        if (f.x < 0 || f.x > W) f.x = f.x < 0 ? W : 0;
        if (f.y < 0 || f.y > H) f.y = f.y < 0 ? H : 0;
      });
    };

    const drawFirefly = (f) => {
      const glow = Math.sin(f.glow) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 255, 200, ${glow})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      if (mountImgRef.current.complete) {
        const img = mountImgRef.current;
        const aspect = img.height / img.width;
        const mWidth = W;
        const mHeight = W * aspect;
        const mountY = (H - mHeight) + (window.scrollY * 0.3);
        ctx.drawImage(img, 0, mountY, mWidth, mHeight);
      }

      updateWaterfall();
      drawWaterfall();
      
      updateFireflies();
      fireflies.forEach(drawFirefly);

      requestAnimationFrame(render);
    };

    resizeCanvas();
    initWaterfall(); // Now populates the whole screen immediately
    initFireflies();
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
          zIndex: -1,
          pointerEvents: 'none' 
        }}
      />
    </>
  );
};

export default BackgroundEffects;