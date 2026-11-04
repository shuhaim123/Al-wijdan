import React, { useId } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  alt?: string;
}

/**
 * Official Al-Wijdan Conference Logo Lockup
 */
export const MarcaEfectoLogo: React.FC<LogoProps> = ({
  size = 'sm',
  className = '',
  alt = 'Al-Wijdan Logo',
}) => {
  const sizeClasses = {
    sm: 'h-11 sm:h-13 md:h-14 max-h-[56px] w-auto max-w-[80px]',
    md: 'h-[125px] sm:h-[155px] md:h-[180px] max-h-[190px] w-auto max-w-[140px]',
    lg: 'h-[240px] sm:h-[320px] md:h-[370px] lg:h-[410px] max-h-[440px] w-auto max-w-[300px]',
  }[size];

  return (
    <img
      src="/logowijdan.jpg"
      alt={alt}
      className={`select-none object-contain ${sizeClasses} ${className}`}
      loading={size === 'sm' ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};

export const AlWijdanLogo = MarcaEfectoLogo;

export const EventStarCalendarIcon: React.FC = () => {
  const id = useId();
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="4" y1="32" x2="32" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE28A" />
          <stop offset="50%" stopColor="#E8B54A" />
          <stop offset="100%" stopColor="#C99026" />
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
          <stop offset="0%" stopColor="#FDE28A" />
          <stop offset="50%" stopColor="#E8B54A" />
          <stop offset="100%" stopColor="#C99026" />
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
          <stop offset="0%" stopColor="#FDE28A" />
          <stop offset="50%" stopColor="#E8B54A" />
          <stop offset="100%" stopColor="#C99026" />
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
