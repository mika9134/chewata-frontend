/**
 * Avatar Component
 * User avatar with optional status indicator
 */

export default function Avatar({
  src,
  alt = "User avatar",
  size = "md",
  status = null, // 'online', 'offline', 'away', null
  className = "",
  initials = "",
  ...props
}) {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-14 h-14 text-xl",
    "2xl": "w-16 h-16 text-2xl",
  };

  const statusColors = {
    online: "bg-success",
    offline: "bg-gray-400",
    away: "bg-warning",
  };

  const statusSizes = {
    xs: "w-2 h-2",
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
    xl: "w-4 h-4",
    "2xl": "w-5 h-5",
  };

  const initialsBase =
    "flex items-center justify-center bg-primary text-white font-semibold";

  return (
    <div className="relative inline-block">
      <div
        className={`rounded-full border-2 border-surface-primary overflow-hidden bg-gray-200 ${sizeClasses[size]} ${className} ${!src && initialsBase}`}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <div
          className={`absolute bottom-0 right-0 rounded-full ${statusSizes[size]} ${statusColors[status]} border-2 border-surface-primary`}
          title={status}
        />
      )}
    </div>
  );
}
