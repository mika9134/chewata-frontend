/**
 * Badge Component
 * Small label for status, count, or category
 */

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    default: "bg-gray-200 text-text-primary dark:bg-gray-700",
    primary: "bg-primary-light text-primary dark:bg-blue-900",
    success: "bg-success-light text-success dark:bg-emerald-900",
    error: "bg-error-light text-error dark:bg-red-900",
    warning: "bg-warning-light text-warning dark:bg-yellow-900",
    info: "bg-info-light text-info dark:bg-blue-900",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs font-medium rounded-md",
    md: "px-2.5 py-1 text-sm font-medium rounded-lg",
    lg: "px-3 py-1.5 text-base font-medium rounded-lg",
  };

  return (
    <span
      className={`inline-block ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
