export default function UKFlag({ size = "w-7 h-7" }: { size?: string }) {
  return (
    <svg className={`${size} rounded-full shadow-xs`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="circleUK">
        <circle cx="30" cy="30" r="30"/>
      </clipPath>
      <g clipPath="url(#circleUK)">
        <rect width="60" height="60" fill="#012169"/>
        <path d="M0,0 L60,60 M60,0 L0,60" stroke="#FFFFFF" strokeWidth="10"/>
        <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="5"/>
        <path d="M30,0 v60 M0,30 h60" stroke="#FFFFFF" strokeWidth="14"/>
        <path d="M30,0 v60 M0,30 h60" stroke="#C8102E" strokeWidth="8"/>
      </g>
    </svg>
  );
}
