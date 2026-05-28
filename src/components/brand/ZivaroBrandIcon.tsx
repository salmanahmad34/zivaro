import { cn } from '@/lib/utils'

/**
 * ZivaroBrandIcon — the official Zivaro connected-square mark.
 *
 * Two overlapping rounded squares: a full-opacity "base" square and a
 * semi-transparent "offset" square — the exact same geometry used in
 * the platform favicon and logo lockup.
 *
 * Use this instead of any arbitrary sparkle/star/decorative icon wherever
 * a brand identity accent is needed across the platform.
 */
interface ZivaroBrandIconProps {
  /** Size preset. Defaults to 'sm'. */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Additional className applied to the outer SVG element. */
  className?: string
  /**
   * Color of the strokes.
   * Defaults to 'currentColor' so it inherits from the parent's text color.
   */
  color?: string
}

const SIZE_MAP = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 28,
}

export const ZivaroBrandIcon = ({
  size = 'sm',
  className,
  color = 'currentColor',
}: ZivaroBrandIconProps) => {
  const px = SIZE_MAP[size]

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={px}
      height={px}
      className={cn('shrink-0 select-none', className)}
    >
      {/* Offset square — background / shadow layer */}
      <rect
        x="13"
        y="5"
        width="14"
        height="14"
        rx="3"
        fill="none"
        stroke={color}
        strokeOpacity={0.4}
        strokeWidth={3}
      />
      {/* Base square — foreground / primary layer */}
      <rect
        x="5"
        y="13"
        width="14"
        height="14"
        rx="3"
        fill="none"
        stroke={color}
        strokeWidth={3}
      />
    </svg>
  )
}
