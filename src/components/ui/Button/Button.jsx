import React from 'react';
import './styles.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className="btn-loader">⏳</span>}
      {children}
    </button>
  );
};

export default Button;