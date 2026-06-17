import { useState } from "react";

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** object-fit; "contain" for branded graphics so text isn't cropped. */
  fit?: "cover" | "contain";
  /** Label shown on the gradient fallback when the image is missing. */
  fallbackLabel?: string;
}

/**
 * Renders an <img> when the file loads, and a styled gradient placeholder when
 * the src is empty OR the file 404s. This keeps the layout intact before the
 * real assets are dropped into public/images/ — no broken-image icons.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  fit = "cover",
  fallbackLabel,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  if (!showImg) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          background:
            "radial-gradient(120% 120% at 0% 0%, color-mix(in srgb, var(--accent) 45%, #0B0C10) 0%, #15161d 55%, #0B0C10 100%)",
        }}
        aria-label={alt}
        role="img"
      >
        {fallbackLabel && (
          <span className="px-4 text-center font-display text-lg font-bold text-cream/80">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: fit }}
    />
  );
}
