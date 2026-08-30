export function BottomMenu() {
  return (
    <svg viewBox="0 0 380 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="380" height="120" fill="#f5f3ee"/>
      <rect x="15" y="45" width="350" height="60" rx="30" fill="#1a1a1a"/>
      
      {/* Corazón */}
      <g transform="translate(50, 75)">
        <path d="M -7,-1 Q -7,-5 -3,-5 Q 0,-2 0,1 Q 0,-2 3,-5 Q 7,-5 7,-1 Q 7,3 0,9 Q -7,3 -7,-1 Z" fill="white" stroke="white" strokeWidth="1.2"/>
      </g>
      
      {/* Gota */}
      <g transform="translate(115, 75)">
        <path d="M 0,-8 Q -3,-4 -3,1 Q -3,5 0,7 Q 3,5 3,1 Q 3,-4 0,-8 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      </g>
      
      {/* Círculo central - Progreso */}
      <circle cx="190" cy="75" r="38" fill="#5ba3e8" stroke="white" strokeWidth="3.5"/>
      <g transform="translate(190, 75)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="0" cy="0" r="4" fill="white"/>
      </g>
      
      {/* Píldora */}
      <g transform="translate(265, 75)">
        <rect x="-5" y="-4" width="10" height="8" rx="4" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      {/* Sol y Luna */}
      <g transform="translate(330, 75)">
        <circle cx="3.5" cy="0" r="3.5" fill="none" stroke="white" strokeWidth="2"/>
        <line x1="3.5" y1="-6.5" x2="3.5" y2="-8.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3.5" y1="6.5" x2="3.5" y2="8.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="7" y1="0" x2="9" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="0" y1="0" x2="-2" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="-2" cy="-1" r="3.2" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="0" cy="-1" r="3.2" fill="#1a1a1a" stroke="none"/>
      </g>
    </svg>
  );
}
