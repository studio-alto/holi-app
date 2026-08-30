const paths = {
  legs: <><path d="M9 4h3v9l-2 7H7l1-8-1-8z" /><path d="M15 4h-3v9l2 7h3l-1-8 1-8z" /></>,
  arm: <><path d="M5 18c1-4 1-8 4-10 2-1.5 5-1 6 1.5 1 2.5-1 4-3 4-1 0-1.8-.5-2-1.5" /><circle cx="15" cy="7" r="2.2" /></>,
  body: <><circle cx="12" cy="5" r="2.2" /><path d="M12 8v6M8 11h8M9 20l3-6 3 6" /></>,
};

export default function RoutineIcon({ routineKey, size = 16, color = '#6FAE82' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {paths[routineKey]}
    </svg>
  );
}
