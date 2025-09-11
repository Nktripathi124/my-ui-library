import React, { useState } from 'react';
import { clsx } from 'clsx';
import { LoaderCircle, Eye, EyeOff, X } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  hasClearButton?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  errorMessage,
  isInvalid = false,
  id,
  variant = 'outlined',
  inputSize = 'md',
  isLoading = false,
  disabled = false,
  hasClearButton = false,
  className,
  type = 'text',
  value,
  onChange,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    const syntheticEvent = {
      ...e,
      target: { ...e.target, value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  const isPasswordType = type === 'password';
  const helperId = helperText || errorMessage ? `${id}-helper` : undefined;

  const baseClasses = 'w-full rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500';
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };
  const variantClasses = {
    outlined: 'border border-gray-300 bg-transparent hover:border-gray-400',
    filled: 'bg-gray-100 border border-transparent hover:bg-gray-200',
    ghost: 'border border-transparent bg-transparent hover:bg-gray-100',
  };
  const invalidClasses = 'border-red-500 focus:ring-red-500';
  const disabledClasses = 'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60';

  const combinedClasses = clsx(
    baseClasses,
    sizeClasses[inputSize],
    variantClasses[variant],
    { [invalidClasses]: isInvalid },
    disabledClasses,
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type={isPasswordType && isPasswordVisible ? 'text' : type}
          className={combinedClasses}
          aria-invalid={isInvalid}
          aria-describedby={helperId}
          disabled={disabled || isLoading}
          value={value}
          onChange={onChange}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2 text-gray-500">
          {isLoading && <LoaderCircle className="h-5 w-5 animate-spin" />}
          
          {hasClearButton && value && !disabled && !isLoading && (
            <button type="button" onClick={handleClear} className="focus:outline-none" aria-label="Clear input">
              <X className="h-5 w-5 hover:text-gray-700" />
            </button>
          )}

          {isPasswordType && !isLoading && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="focus:outline-none"
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
      {errorMessage && isInvalid ? (
        <p id={helperId} className="mt-1 text-sm text-red-600">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};