// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Animate title text with staggered letter reveal
    const title = document.querySelector('.login h2');
    if (title) {
      const text = title.textContent;
      title.textContent = '';
      
      // Wrap each character in a span for animation
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.animationDelay = `${1.2 + (i * 0.05)}s`; // Staggered animation
        title.appendChild(span);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Success animation before navigation
      const formContainer = document.querySelector('.login-container');
      if (formContainer) {
        formContainer.style.animation = 'formSuccess 0.5s forwards';
      }
      
      // Add a small delay for the animation
      setTimeout(() => {
        navigate('/job-role-analyzer');
      }, 600);
      
    } catch (error) {
      setError('Login failed: ' + error.message);
      setIsSubmitting(false);
      
      // Shake animation for error
      const errorElement = document.querySelector('.error-message');
      if (errorElement) {
        errorElement.style.animation = 'none';
        setTimeout(() => {
          errorElement.style.animation = 'errorShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards';
        }, 10);
      }
    }
  };

  // Add form success animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes formSuccess {
        0% {
          transform: translateZ(0) translateY(0);
          box-shadow: var(--box-shadow), 0 0 20px var(--glow-primary);
        }
        100% {
          transform: translateZ(50px) translateY(-20px);
          box-shadow: var(--box-shadow), 0 0 40px var(--glow-secondary);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="login">
      {/* Background elements */}
      <div className="login-bg-gradient"></div>
      <div className="login-cinema-overlay"></div>
      <div className="login-light-beam"></div>
      <div className="login-light-beam"></div>
      
      {/* Back button */}
      <Link to="/" className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      
      {/* Login Form */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder=" " 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required 
            />
            <span className="input-label">Email</span>
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder=" " 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <span className="input-label">Password</span>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;