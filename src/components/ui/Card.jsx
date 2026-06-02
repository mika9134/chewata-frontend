/**
 * Card Component
 * Flexible container with consistent styling
 */

export default function Card({
  children,
  className = "",
  padding = "md",
  clickable = false,
  hover = false,
  onClick,
  ...props
}) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  const baseStyles = `bg-surface-secondary rounded-xl border border-border transition-all duration-200`;

  const hoverStyles =
    hover || clickable
      ? "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
      : "";

  const clickableStyles = clickable
    ? "cursor-pointer active:scale-95"
    : "";

  const cardClasses = `${baseStyles} ${hoverStyles} ${clickableStyles} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
