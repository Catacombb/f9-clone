"use client";

import { useState, useEffect } from 'react';
import styles from './BookCallModal.module.css';
import { X } from 'lucide-react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Reset form when modal is opened
    if (isOpen) {
      setName('');
      setPhone('');
      setError('');
      setSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validatePhone = (phoneNumber: string) => {
    // Basic validation for phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number (e.g., +12345678901)');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Make API call to backend to initiate Vapi call
      const response = await fetch('/api/make-direct-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        let errorMessage = data.message || 'Failed to schedule call';
        
        // Handle specific error cases
        if (data.message === 'Phone Number ID not configured') {
          errorMessage = 'The system is not properly configured. Please contact support.';
        } else if (data.message === 'Assistant ID not configured') {
          errorMessage = 'The system is not properly configured. Please contact support.';
        }
        
        throw new Error(errorMessage);
      }
      
      // Show success message
      setSuccess(true);
      
      // Close modal after delay
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Error making call:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className={styles.title}>Book a Call</h2>
        
        {success ? (
          <div className={styles.successMessage}>
            <p>Thank you! We'll call you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (234) 567-8901"
                required
              />
              <small>Include country code (e.g., +1 for US)</small>
            </div>
            
            {error && <p className={styles.error}>{error}</p>}
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Call Me'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookCallModal; 