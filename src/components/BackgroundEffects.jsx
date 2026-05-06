import React, { useEffect, useRef } from 'react';
import '../styles/waterfall.css';

const BackgroundEffects = () => {
  const canvasRef = useRef(null);
  const atmosphereRef = useRef(null);
  const rippleFlashRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const atmosphere = atmosphereRef.current;
    const rippleFlash = rippleFlashRef.current;
    
    if (!canvas || !atmosphere || !rippleFlash) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    let mistParticles = [];
    let birds = [];
    let fireflies = [];
    let treeSilhouettes = [];
    let rockSilhouettes = [];

    // Resize canvas
    const resizeCanvas = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      generateTerrain();
    };

    // Generate terrain elements
    const generateTerrain = () => {
      treeSilhouettes = [];
      rockSilhouettes = [];

      const cx = W * 0.5;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 200 + Math.random() * 100;
        treeSilhouettes.push({
          x: cx + Math.cos(angle) * radius,
          y: H * 0.7 + Math.sin(angle) * 50,
          width: 30 + Math.random() * 40,
          height: 80 + Math.random() * 120,
          opacity: 0.1 + Math.random() * 0.2
        });
      }

      for (let i = 0; i < 5; i++) {
        rockSilhouettes.push({
          x: Math.random() * W,
          y: H * 0.8 + Math.random() * H * 0.2,
          width: 50 + Math.random() * 100,
          height: 20 + Math.random() * 40,
          opacity: 0.05 + Math.random() * 0.1
        });
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          life: 1
        });
      }
    };

    // Initialize mist
    const initMist = () => {
      mistParticles = [];
      for (let i = 0; i < 50; i++) {
        mistParticles.push({
          x: Math.random() * W,
          y: H * 0.6 + Math.random() * H * 0.4,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -Math.random() * 0.1,
          size: Math.random() * 100 + 50,
          opacity: Math.random() * 0.1 + 0.02
        });
      }
    };

    // Initialize birds
    const initBirds = () => {
      birds = [];
      for (let i = 0; i < 8; i++) {
        birds.push({
          x: Math.random() * W,
          y: H * 0.1 + Math.random() * H * 0.3,
          vx: Math.random() * 2 + 0.5,
          wingPhase: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize fireflies
    const initFireflies = () => {
      fireflies = [];
      for (let i = 0; i < 20; i++) {
        fireflies.push({
          x: Math.random() * W,
          y: H * 0.3 + Math.random() * H * 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          glow: Math.random(),
          glowSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Draw tree silhouette
    const drawTree = (tree) => {
      ctx.save();
      ctx.globalAlpha = tree.opacity;
      ctx.fillStyle = '#0a0a08';
      
      // Trunk
      ctx.fillRect(tree.x - tree.width * 0.1, tree.y, tree.width * 0.2, tree.height);
      
      // Foliage
      ctx.beginPath();
      ctx.arc(tree.x, tree.y - tree.height * 0.2, tree.width * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(tree.x - tree.width * 0.3, tree.y - tree.height * 0.1, tree.width * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(tree.x + tree.width * 0.3, tree.y - tree.height * 0.1, tree.width * 0.4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Draw rock silhouette
    const drawRock = (rock) => {
      ctx.save();
      ctx.globalAlpha = rock.opacity;
      ctx.fillStyle = '#0a0a08';
      ctx.beginPath();
      ctx.ellipse(rock.x, rock.y, rock.width * 0.5, rock.height * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Draw particle
    const drawParticle = (particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity * particle.life;
      ctx.fillStyle = '#4A9B6E';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Draw mist
    const drawMist = (mist) => {
      ctx.save();
      ctx.globalAlpha = mist.opacity;
      const gradient = ctx.createRadialGradient(mist.x, mist.y, 0, mist.x, mist.y, mist.size);
      gradient.addColorStop(0, 'rgba(74, 155, 110, 0.1)');
      gradient.addColorStop(1, 'rgba(74, 155, 110, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(mist.x - mist.size, mist.y - mist.size, mist.size * 2, mist.size * 2);
      ctx.restore();
    };

    // Draw bird
    const drawBird = (bird) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(214, 207, 194, 0.3)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      
      const wingOffset = Math.sin(bird.wingPhase) * 3;
      
      // Left wing
      ctx.beginPath();
      ctx.moveTo(bird.x - 5, bird.y + wingOffset);
      ctx.quadraticCurveTo(bird.x - 2, bird.y, bird.x + 1, bird.y - wingOffset);
      ctx.stroke();
      
      // Right wing
      ctx.beginPath();
      ctx.moveTo(bird.x + 1, bird.y - wingOffset);
      ctx.quadraticCurveTo(bird.x + 4, bird.y, bird.x + 7, bird.y + wingOffset);
      ctx.stroke();
      
      ctx.restore();
    };

    // Draw firefly
    const drawFirefly = (firefly) => {
      ctx.save();
      const glowIntensity = Math.sin(firefly.glow) * 0.5 + 0.5;
      
      // Glow
      const gradient = ctx.createRadialGradient(firefly.x, firefly.y, 0, firefly.x, firefly.y, firefly.size * 4);
      gradient.addColorStop(0, `rgba(255, 255, 200, ${glowIntensity * 0.3})`);
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(firefly.x - firefly.size * 4, firefly.y - firefly.size * 4, firefly.size * 8, firefly.size * 8);
      
      // Core
      ctx.globalAlpha = glowIntensity;
      ctx.fillStyle = '#FFFFCC';
      ctx.beginPath();
      ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Update particles
    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.005;
        
        if (particle.y > H || particle.life <= 0) {
          particle.x = Math.random() * W;
          particle.y = -10;
          particle.life = 1;
        }
      });
    };

    // Update mist
    const updateMist = () => {
      mistParticles.forEach(mist => {
        mist.x += mist.vx;
        mist.y += mist.vy;
        
        if (mist.x < -mist.size) mist.x = W + mist.size;
        if (mist.x > W + mist.size) mist.x = -mist.size;
        if (mist.y < -mist.size) mist.y = H + mist.size;
        if (mist.y > H + mist.size) mist.y = -mist.size;
      });
    };

    // Update birds
    const updateBirds = () => {
      birds.forEach(bird => {
        bird.x += bird.vx;
        bird.wingPhase += 0.2;
        
        if (bird.x > W + 20) {
          bird.x = -20;
          bird.y = H * 0.1 + Math.random() * H * 0.3;
        }
      });
    };

    // Update fireflies
    const updateFireflies = () => {
      fireflies.forEach(firefly => {
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;
        firefly.glow += firefly.glowSpeed;
        
        if (Math.random() < 0.01) {
          firefly.vx = (Math.random() - 0.5) * 0.3;
          firefly.vy = (Math.random() - 0.5) * 0.3;
        }
        
        if (firefly.x < 0) firefly.x = W;
        if (firefly.x > W) firefly.x = 0;
        if (firefly.y < 0) firefly.y = H;
        if (firefly.y > H) firefly.y = 0;
      });
    };

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Draw terrain
      treeSilhouettes.forEach(drawTree);
      rockSilhouettes.forEach(drawRock);
      
      // Draw effects
      mistParticles.forEach(drawMist);
      particles.forEach(drawParticle);
      birds.forEach(drawBird);
      fireflies.forEach(drawFirefly);
      
      // Update
      updateParticles();
      updateMist();
      updateBirds();
      updateFireflies();
      
      requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    initMist();
    initBirds();
    initFireflies();
    
    // Set initial funding state for animation
    setTimeout(() => {
      render();
    }, 500);

    // Event listeners
    window.addEventListener('resize', () => { 
      resizeCanvas(); 
      initBirds(); 
      initFireflies(); 
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        id="waterfallCanvas" 
        aria-hidden="true"
      />
      <div 
        ref={atmosphereRef}
        id="atmosphere" 
        aria-hidden="true"
      />
      <div 
        ref={rippleFlashRef}
        className="ripple-flash" 
        aria-hidden="true"
      />
    </>
  );
};

export default BackgroundEffects;
