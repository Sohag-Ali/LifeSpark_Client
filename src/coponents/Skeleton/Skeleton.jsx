import React from "react";

/**
 * Base Skeleton Component for rendering generic pulsating loader shapes.
 */
export const Skeleton = ({ className = "", variant = "rect" }) => {
  const baseClasses = "animate-pulse bg-white/10";
  const variantClasses = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "h-4 rounded w-full",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant] || ""} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
