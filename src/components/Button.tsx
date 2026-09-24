import React from 'react';

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  style,
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = `btn-${variant}`;

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
};
