import React, { useId } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Exact vector reproduction of the MZ + MARCA EFECTO geometric logo lockup
 */
export const MarcaEfectoLogo: React.FC<LogoProps> = ({ size = 'sm', className = '' }) => {
  const gradId = useId();

  const dimensions = {
    sm: 'w-[148px] sm:w-[172px]',
    md: 'w-[195px] sm:w-[225px]',
    lg: 'w-[270px] sm:w-[390px] lg:w-[465px]',
  }[size];

  return (
    <svg
      viewBox="0 0 384 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${dimensions} h-auto ${className}`}
      role="img"
      aria-label="Marca Efecto"
    >
      <defs>
        <linearGradient id={gradId} x1="107" y1="55" x2="277" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B427CC" />
          <stop offset="48%" stopColor="#5D6EE0" />
          <stop offset="100%" stopColor="#1CD89A" />
        </linearGradient>
      </defs>

      {/* MZ Monogram Outline */}
      <g
        transform="translate(11, 0)"
        stroke={`url(#${gradId})`}
        strokeWidth="3.6"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      >
        {/* Upper M + Z Top Bar Polygon with signature left notch */}
        <path d="M 106 10 H 137 L 166 39 L 195 10 H 256 V 36 H 199 L 166 69 L 133 36 V 108 H 106 V 45 L 118 33 H 106 Z" />
        {/* Lower Z Nested Polygon */}
        <path d="M 206 58 H 239 L 211 86 H 256 V 108 H 180 V 84 L 206 58 Z" />
      </g>

      {/* Custom Geometric Wordmark: M Λ R C Λ   ≡ F ≡ C T O */}
      <g
        stroke="#FFFFFF"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* M */}
        <path d="M 12 162 V 140 L 22 155 L 32 140 V 162" />
        {/* A (stylized lambda without crossbar) */}
        <path d="M 50 162 L 59 140 L 68 162" />
        {/* R */}
        <path d="M 86 162 V 140 H 95 C 99.5 140 102 142.5 102 146 C 102 149.5 99.5 152 95 152 H 86 M 94.5 152 L 102.5 162" />
        {/* C */}
        <path d="M 136 143.5 C 133.8 141.2 130.8 140 127.5 140 C 121 140 116.5 144.8 116.5 151 C 116.5 157.2 121 162 127.5 162 C 130.8 162 133.8 160.8 136 158.5" />
        {/* A (stylized lambda without crossbar) */}
        <path d="M 152 162 L 161 140 L 170 162" />

        {/* E (three floating horizontal bars) */}
        <path d="M 206 140 H 217 M 206 151 H 215.5 M 206 162 H 217" />
        {/* F */}
        <path d="M 235 162 V 140 H 247.5 M 235 151 H 245" />
        {/* E (three floating horizontal bars) */}
        <path d="M 265 140 H 276 M 265 151 H 274.5 M 265 162 H 276" />
        {/* C */}
        <path d="M 311 143.5 C 308.8 141.2 305.8 140 302.5 140 C 296 140 291.5 144.8 291.5 151 C 291.5 157.2 296 162 302.5 162 C 305.8 162 308.8 160.8 311 158.5" />
        {/* T */}
        <path d="M 326 140 H 341 M 333.5 140 V 162" />
        {/* O */}
        <circle cx="362" cy="151" r="11" />
      </g>
    </svg>
  );
};

export const EventStarCalendarIcon: React.FC = () => {
  const id = useId();
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="4" y1="32" x2="32" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B821C7" />
          <stop offset="100%" stopColor="#12D69D" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="28" height="26" rx="4" stroke={`url(#${id})`} strokeWidth="1.9" />
      <path d="M4 13H32" stroke={`url(#${id})`} strokeWidth="1.9" />
      <path d="M11 3V8M25 3V8" stroke={`url(#${id})`} strokeWidth="1.9" strokeLinecap="round" />
      <path
        d="M18 16.5L19.65 19.85L23.35 20.38L20.67 22.99L21.3 26.67L18 24.93L14.7 26.67L15.33 22.99L12.65 20.38L16.35 19.85L18 16.5Z"
        stroke={`url(#${id})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EventClockIcon: React.FC = () => {
  const id = useId();
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="4" y1="32" x2="32" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B821C7" />
          <stop offset="100%" stopColor="#12D69D" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="14" stroke={`url(#${id})`} strokeWidth="2" />
      <path d="M18 10.5V18.5L23.5 21.5" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const EventPinIcon: React.FC = () => {
  const id = useId();
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="6" y1="32" x2="30" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B821C7" />
          <stop offset="100%" stopColor="#12D69D" />
        </linearGradient>
      </defs>
      <path
        d="M18 32C18 32 29 22.4 29 14.5C29 8.42487 24.0751 3.5 18 3.5C11.9249 3.5 7 8.42487 7 14.5C7 22.4 18 32 18 32Z"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="14.5" r="4.2" stroke={`url(#${id})`} strokeWidth="2" />
    </svg>
  );
};

export const OutlinedGradientNumber: React.FC<{ value: string }> = ({ value }) => {
  const id = useId();
  return (
    <svg
      viewBox="0 0 98 76"
      className="w-[68px] sm:w-[82px] md:w-[92px] h-auto shrink-0 select-none overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="4" y1="38" x2="94" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BA21C8" />
          <stop offset="52%" stopColor="#6D63B3" />
          <stop offset="100%" stopColor="#11D69B" />
        </linearGradient>
      </defs>
      <text
        x="49"
        y="63"
        textAnchor="middle"
        fill="transparent"
        stroke={`url(#${id})`}
        strokeWidth="1.65"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '68px',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </text>
    </svg>
  );
};

export const FlagColombia: React.FC = () => (
  <svg viewBox="0 0 28 19" className="w-[26px] h-[18px] rounded-[2px] shadow-sm shrink-0" aria-label="Bandera de Colombia">
    <rect width="28" height="9.5" fill="#FCD116" />
    <rect y="9.5" width="28" height="4.75" fill="#003893" />
    <rect y="14.25" width="28" height="4.75" fill="#CE1126" />
  </svg>
);

export const FlagUSA: React.FC = () => (
  <svg viewBox="0 0 28 19" className="w-[26px] h-[18px] rounded-[2px] shadow-sm shrink-0" aria-label="Bandera de Estados Unidos">
    <rect width="28" height="19" fill="#FFFFFF" />
    {[0, 2, 4, 6, 8, 10, 12].map((stripe) => (
      <rect key={stripe} y={(stripe * 19) / 13} width="28" height={19 / 13} fill="#B22234" />
    ))}
    <rect width="11.5" height={(7 * 19) / 13} fill="#3C3B6E" />
    <g fill="#FFFFFF">
      {[2, 4.5, 7, 9.5].map((cx) =>
        [2, 5, 8].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.55" />)
      )}
    </g>
  </svg>
);

export const FlagDominicanRepublic: React.FC = () => (
  <svg viewBox="0 0 28 19" className="w-[26px] h-[18px] rounded-[2px] shadow-sm shrink-0" aria-label="Bandera de República Dominicana">
    <rect width="28" height="19" fill="#FFFFFF" />
    <rect x="0" y="0" width="12" height="7.6" fill="#002D62" />
    <rect x="16" y="0" width="12" height="7.6" fill="#CE1126" />
    <rect x="0" y="11.4" width="12" height="7.6" fill="#CE1126" />
    <rect x="16" y="11.4" width="12" height="7.6" fill="#002D62" />
    <circle cx="14" cy="9.5" r="1.35" fill="#006847" />
  </svg>
);
