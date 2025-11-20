import React, { forwardRef } from 'react';
import './styles.css';

/**
 * Reusable Input Component dengan forwardRef untuk react-hook-form
 * @param {Object} props - Component props
 * @param {string} props.label - Label untuk input
 * @param {string} props.type - Type input (text, email, password, dll)
 * @param {string} props.name - Name attribute untuk input
 * @param {string} props.error - Error message
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Apakah input required
 * @param {boolean} props.disabled - Apakah input disabled
 * @param {ref} ref - React forwardRef
 */
const Input = forwardRef(({
  label,
  type = 'text',
  name,
  error,
  placeholder = '',
  required = false,
  disabled = false,
  ...props
}, ref) => {
  return (
    <div className="input-group">
      {/* Label untuk input field */}
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      {/* Input field itu sendiri */}
      <input
        ref={ref} // Forward ref untuk react-hook-form
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-invalid={error ? "true" : "false"} // Accessibility
        aria-describedby={error ? `${name}-error` : undefined}
        {...props} // Spread semua props lainnya
      />
      
      {/* Error message di bawah input */}
      {error && (
        <span id={`${name}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
});

// Display name untuk debugging di React DevTools
Input.displayName = 'Input';

export default Input;