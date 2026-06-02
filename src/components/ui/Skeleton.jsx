/**
 * Skeleton Component
 * Animated loading placeholder
 */

export default function Skeleton({
  width = "w-full",
  height = "h-4",
  className = "",
  rounded = "rounded-lg",
  count = 1,
  ...props
}) {
  const baseStyles =
    "bg-gray-200 dark:bg-gray-700 animate-pulse";

  if (count > 1) {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseStyles} ${width} ${height} ${rounded} ${className} mb-2`}
            {...props}
          />
        ))}
      </>
    );
  }

  return (
    <div
      className={`${baseStyles} ${width} ${height} ${rounded} ${className}`}
      {...props}
    />
  );
}
