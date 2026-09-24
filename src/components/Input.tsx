import React from 'react';

export interface InputProps {
  id: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  helperText,
  disabled = false,
  className = '',
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}
      <input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`form-input ${className}`.trim()}
      />
      {error && <span className="form-error">{error}</span>}
      {helperText && !error && <span className="form-help">{helperText}</span>}
    </div>
  );
};
