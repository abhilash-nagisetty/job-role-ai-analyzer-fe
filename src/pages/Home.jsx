// src/pages/Home.jsx
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create particles with varying properties
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
      // Remove any existing particles first
      while (particlesContainer.firstChild) {
        particlesContainer.removeChild(particlesContainer.firstChild);
      }
      
      // Create new particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Set custom properties for each particle
        const size = Math.random() * 6 + 2; // 2-8px
        const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
        const duration = Math.random() * 10 + 15; // 15-25s
        const offsetX = Math.random() * 100; // 0-100
        const drift = (Math.random() - 0.5) * 200; // -100 to 100
        
        // Apply as CSS variables
        particle.style.setProperty('--size', `${size}px`);
        particle.style.setProperty('--opacity', opacity);
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--offset-x', `${offsetX}vw`);
        particle.style.setProperty('--drift', `${drift}px`);
        
        // Add delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
      }
    }
    
    // Animate the title text with staggered letter reveal
    const title = document.querySelector('h1');
    if (title) {
      const text = title.textContent;
      title.textContent = '';
      
      // Wrap each character in a span for animation
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Use non-breaking space for spaces
        span.style.animationDelay = `${1.2 + (i * 0.05)}s`; // Staggered animation delay
        title.appendChild(span);
      }
    }
  }, []);

  return (
    <div className="home">
      <div className="bg-gradient"></div>
      <div className="cinema-overlay"></div>
      <div className="light-beam"></div>
      <div className="light-beam"></div>
      <div className="particles-container"></div>
      
      <div className="title-container">
        <h1>Job Role Analyzer</h1>
      </div>
      
      <div className="button-container">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
}

export default Home;

// src/pages/Home.jsx
/*
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Job Role Analyzer</h1>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}

export default Home;

// src/pages/Home.jsx
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Add data-text attribute to the title for the glow effect
    const title = document.querySelector('h1');
    if (title) {
      title.setAttribute('data-text', title.textContent);
    }
  }, []);

  return (
    <div className="home">
      <div className="light-particles">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="particle"></div>
        ))}
      </div>
      <h1>Job Role Analyzer</h1>
      <div className="button-container">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
}

export default Home;
*/
