import React from 'react'

const cn = (...inputs) => inputs.filter(Boolean).join(' ')

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
}) => {
  const baseStyles =
    'h-9 rounded-lg px-4 py-2 font-medium transition duration-300 ease-in-out inline-flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-300'

  const variantStyles = {
    primary:
      'bg-neutral-800 text-white hover:bg-neutral-700 border border-transparent',
    secondary:
      'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-transparent',
    outline:
      'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100',
  }

  return (
    <button
      className={cn(baseStyles, !disabled && variantStyles[variant], className)}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
