// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Initialize animations when component mounts
  useEffect(() => {
    // Animate title text with staggered letter reveal
    const title = document.querySelector('.register h2');
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

    // Add floating circles animation programmatically
    const registerBg = document.querySelector('.register-bg');
    if (registerBg) {
      // Create more animated circles for a richer background
      for (let i = 0; i < 5; i++) {
        const size = Math.random() * 150 + 100; // 100-250px
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        circle.style.opacity = `${Math.random() * 0.1 + 0.05}`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        circle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        registerBg.appendChild(circle);
      }
    }
  }, []);

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial]
      .filter(Boolean).length;
    
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (strength <= 2) {
      setPasswordStrength("weak");
    } else if (strength === 3) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      // Firebase registration
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Success animation before navigation
      const formContainer = document.querySelector('.register-container');
      if (formContainer) {
        formContainer.style.animation = 'formSuccess 0.8s forwards';
      }
      
      // Add a small delay for the animation
      setTimeout(() => {
        navigate("/job-role-analyzer");
      }, 800);
      
    } catch (error) {
      setError("Registration failed: " + error.message);
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
          transform: translateZ(0) scale(1);
          box-shadow: var(--box-shadow), 0 0 20px var(--glow-primary);
        }
        50% {
          transform: translateZ(30px) scale(1.03);
          box-shadow: var(--box-shadow), 0 0 40px var(--glow-accent);
        }
        100% {
          transform: translateZ(100px) scale(0.95);
          box-shadow: var(--box-shadow), 0 0 60px var(--glow-accent);
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
    <div className="register">
      {/* Background elements */}
      <div className="register-bg">
        <div className="register-bg-gradient"></div>
        <div className="register-cinema-overlay"></div>
        <div className="register-light-beam"></div>
        <div className="register-light-beam"></div>
        {/* Dynamic circles added via JS */}
      </div>
      
      {/* Back button */}
      <Link to="/" className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>
      
      {/* Registration Form */}
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder=" " 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <span className="input-label">Email</span>
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder=" " 
              value={password}
              onChange={handlePasswordChange} 
              required 
            />
            <span className="input-label">Password</span>
            
            {password && (
              <div className="password-strength">
                <div className={`password-strength-bar strength-${passwordStrength}`}></div>
              </div>
            )}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;