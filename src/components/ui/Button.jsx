/**
 * Button Component
 * Flexible button component with multiple variants and sizes
 * Supports loading state with spinner
 */

import { Loader2 } from "lucide-react";

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  children,
  className = "",
  onClick,
  type = "button",
  title,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-600 focus:ring-primary active:scale-95",
    secondary:
      "bg-gray-200 text-text-primary hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 active:scale-95",
    ghost:
      "bg-transparent text-text-primary hover:bg-gray-100 focus:ring-gray-300 dark:hover:bg-gray-800 active:scale-95",
    danger:
      "bg-error text-white hover:bg-red-600 focus:ring-error active:scale-95",
    success:
      "bg-success text-white hover:bg-emerald-600 focus:ring-success active:scale-95",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary-lighter focus:ring-primary active:scale-95",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
    icon: "p-2",
    'icon-sm': "p-1.5",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={buttonClasses}
      onClick={onClick}
      title={title}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
