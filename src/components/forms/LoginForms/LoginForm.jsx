import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from './validationSchema';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import './styles.css';

/**
 * Komponen LoginForm - Form untuk login user
 * @returns {JSX.Element} Form login
 */
const LoginForm = () => {
  // Gunakan custom hook useAuth untuk state management authentication
  const { user, login, isLoading, error } = useAuth();
  
  // State untuk toggle show/hide password
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk menampilkan success message
  const [successMessage, setSuccessMessage] = useState('');

  // Setup react-hook-form dengan yup validation
  const {
    register,           // Fungsi untuk register input fields
    handleSubmit,       // Fungsi untuk handle form submission
    formState: { errors, isValid }, // State form: errors dan valid status
    reset,              // Fungsi untuk reset form
    watch               // Fungsi untuk watch form values
  } = useForm({
    resolver: yupResolver(loginValidationSchema), // Integrasi dengan Yup validation
    mode: 'onChange' // Validation trigger pada setiap perubahan input
  });

  // Watch form values untuk real-time validation feedback
  const watchedValues = watch();

  /**
   * Handle form submission
   * @param {Object} data - Data dari form {email, password}
   */
  const onSubmit = async (data) => {
    console.log('📤 Form submitted:', data);
    
    // Panggil fungsi login dari useAuth hook
    const result = await login(data.email, data.password);
    
    if (result.success) {
      // Jika login berhasil
      setSuccessMessage(`Login berhasil! Selamat datang ${result.user.name}`);
      reset(); // Reset form fields
      
      // Auto hide success message setelah 5 detik
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  };

  /**
   * Handle toggle show/hide password
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log('👁️ Password visibility:', !showPassword ? 'shown' : 'hidden');
  };

  // Effect untuk log perubahan form values (untuk debugging)
  useEffect(() => {
    console.log('📝 Form values changed:', watchedValues);
  }, [watchedValues]);

  // Effect untuk check jika user sudah login
  useEffect(() => {
    if (user) {
      console.log('👤 User sudah login:', user);
    }
  }, [user]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
        {/* Header Form */}
        <h2 className="login-title">Login ke Akun Anda</h2>
        <p className="login-subtitle">Masukkan email dan password Anda</p>
        
        {/* Success Message */}
        {successMessage && (
          <div className="success-banner">
            ✅ {successMessage}
          </div>
        )}

        {/* Error Message dari Authentication */}
        {error && (
          <div className="error-banner">
            ❌ {error}
          </div>
        )}

        {/* Email Input Field */}
        <Input
          label="Email Address"
          type="email"
          {...register('email')} // Register field ke react-hook-form
          error={errors.email?.message} // Tampilkan error message jika ada
          placeholder="contoh: user@email.com"
          required
          autoComplete="email" // Browser autocomplete helper
        />

        {/* Password Input Field dengan Toggle Visibility */}
        <div className="password-group">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={errors.password?.message}
            placeholder="masukkan password Anda"
            required
            autoComplete="current-password"
          />
          {/* Toggle Password Visibility Button */}
          <button
            type="button"
            className="show-password-btn"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={!isValid || isLoading}
          className="login-button"
        >
          {isLoading ? '🔄 Memproses...' : '🚀 Login'}
        </Button>

        {/* Demo Information */}
        <div className="login-info">
          <h4>💡 Informasi Login:</h4>
          <p>Anda bisa menggunakan <strong>email dan password apa saja</strong> dengan ketentuan:</p>
          <ul>
            <li>✅ Format email valid (contoh: user@domain.com)</li>
            <li>✅ Password minimal 6 karakter</li>
          </ul>
          <p className="demo-note">
            Data akan disimpan di <code>localStorage</code> browser Anda.
          </p>
        </div>

        {/* Form Status Debug (hanya development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="debug-info">
            <h4>🐛 Debug Info:</h4>
            <p>Form Valid: {isValid ? '✅' : '❌'}</p>
            <p>Loading: {isLoading ? '✅' : '❌'}</p>
            <p>User: {user ? `Logged in as ${user.email}` : 'Not logged in'}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;