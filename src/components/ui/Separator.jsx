/**
 * Separator Component
 * Divider line for visual separation
 */

export default function Separator({
  orientation = "horizontal",
  className = "",
  ...props
}) {
  const baseStyles = "bg-border";

  const orientationStyles = {
    horizontal: "w-full h-px",
    vertical: "h-full w-px",
  };

  return (
    <div
      className={`${baseStyles} ${orientationStyles[orientation]} ${className}`}
      {...props}
    />
  );
}
