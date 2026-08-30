const paths = {
  pilates: <><circle cx="12" cy="5" r="2" /><path d="M12 7v5M8 20l4-8 4 8M6 12h4" /></>,
  yoga: <><circle cx="12" cy="5" r="2" /><path d="M12 7v4M6 20c0-4 3-6 6-6s6 2 6 6" /></>,
  hiit: <path d="M12 3c1 3-2 4-2 7a2 2 0 104 0c0-1-1-2-1-3.5 1.5 1.5 2.5 3.5 2.5 6a5 5 0 11-10 0c0-4 2-6.5 6-9.5z" />,
  cardio: <path d="M3 12h4l2-7 4 14 3-9h5" />,
  fuerza: <><rect x="2" y="9" width="3" height="6" rx="1" /><rect x="19" y="9" width="3" height="6" rx="1" /><line x1="5" y1="12" x2="19" y2="12" /><rect x="6.5" y="7" width="2.5" height="10" rx="1" /><rect x="15" y="7" width="2.5" height="10" rx="1" /></>,
  stretching: <><circle cx="12" cy="5" r="2" /><path d="M12 7l-3 5M9 12l-3 6M12 7l4 3M16 10l2 6" /></>,
  danza: <><circle cx="12" cy="5" r="2" /><path d="M12 7v4M12 11l-4-2M12 11l5 1M12 11l-2 8M12 11l3 8" /></>,
};

export default function ExerciseTypeIcon({ id, color, size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {paths[id]}
    </svg>
  );
}
