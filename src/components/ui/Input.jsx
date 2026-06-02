/**
 * Input Component
 * Consistent form input with proper styling and states
 */

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  required = false,
  className = "",
  size = "md",
  error = false,
  leftIcon = null,
  rightIcon = null,
  ...props
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const baseStyles =
    "w-full border-2 rounded-lg transition-all duration-200 focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed bg-surface-primary text-text-primary placeholder:text-text-tertiary";

  const borderStyles = error
    ? "border-error focus:border-error focus:ring-2 focus:ring-error-light"
    : "border-border hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary-light";

  const inputClasses = `${baseStyles} ${sizeClasses[size]} ${borderStyles} ${className}`;

  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={`${inputClasses} ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}`}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
