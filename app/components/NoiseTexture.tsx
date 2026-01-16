/**
 * NoiseTexture - Reusable noise overlay to eliminate gradient banding
 * Apply this over any section with gradients
 */

export default function NoiseTexture({ opacity = 0.04, className = '' }: { opacity?: number; className?: string }) {
  return (
    <>
      {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="noiseFilterGlobal">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>
      
      {/* Noise Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: opacity,
          mixBlendMode: 'overlay',
        }}
      />
    </>
  )
}
