import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'mdb_state_v1';

export const defaultState = {
  onboardingDone: false,
  onboardingStep: 0,
  screen: 'home',

  obName: '',
  obEmail: '',
  obAge: '',
  obCountry: '',

  obWaterUnit: 'vasos',
  thermoSize: '1000',
  customThermoInput: '',

  obMedsOn: false,
  obMedTypes: [],
  obMedQty: null,
  obMedReminders: true,

  obSkinOn: false,
  obSkinAM: null,
  obSkinPM: null,
  obSpfOn: false,
  obSpfTimes: [],
  obSpfReminder: true,
  obSkinType: null,

  obExOn: false,
  obExerciseTypes: [],
  obExFreq: null,
  obExDuration: null,
  obExTimes: [],
  obExGoals: [],
  obExReminders: true,

  obPlan: 'annual',
  obPlanType: '',

  // Demo dashboard data (would come from real daily logs in production)
  streak: 4,
  waterTodayMl: 1250,
  waterGoalMl: 2000,
  waterQuickAmount: 250,
  // Past 6 days (Dom-Vie), ml logged — today (Sáb) is derived live from waterTodayMl
  waterHistoryMl: [1800, 2100, 1600, 2200, 1500, 1900],
  // Only used when notif.cats.water is on — daily push reminder time
  waterReminderTime: '12:00',

  // Replaced with the real personalized list once onboarding completes
  // (see personalizeMeds in utils/templates.js) — stays empty until then,
  // since Medicamentos isn't reachable before onboardingDone anyway.
  meds: [],
  medWeekPct: 85,
  medEditMode: false,
  medModalOpen: false,
  editingMedId: null,
  medForm: { name: '', type: 'Vitamina', dose: '', freq: 'Diario', time: '08:00', notes: '', color: '#d4847a' },
  alarmToast: null,

  routines: [
    {
      id: 'glutes', key: 'legs', name: 'Piernas fuertes', desc: 'Sentadillas, hip thrusts, escaladoras',
      exercises: [
        { name: 'Sentadillas', sets: 4, reps: 15, done: 0 },
        { name: 'Hip thrusts', sets: 3, reps: 12, done: 0 },
        { name: 'Escaladoras', sets: 3, reps: 20, done: 0 },
      ],
    },
    {
      id: 'arms', key: 'arm', name: 'Brazos de acero', desc: 'Flexiones, mancuernas, poleas',
      exercises: [
        { name: 'Flexiones', sets: 4, reps: 15, done: 4 },
        { name: 'Mancuernas', sets: 3, reps: 12, done: 3 },
        { name: 'Poleas', sets: 3, reps: 15, done: 0 },
      ],
    },
    {
      id: 'full', key: 'body', name: 'Full body', desc: 'Combinado, todo tu cuerpo',
      exercises: [
        { name: 'Sentadillas', sets: 3, reps: 15, done: 0 },
        { name: 'Flexiones', sets: 3, reps: 12, done: 0 },
        { name: 'Plancha', sets: 3, reps: 30, done: 0 },
        { name: 'Zancadas', sets: 3, reps: 12, done: 0 },
      ],
    },
  ],
  selectedRoutineIds: ['arms'],
  // Only used when notif.cats.exercise is on — daily push reminder time
  exerciseReminderTime: '18:00',
  exWeek: [
    { day: 'L', done: true }, { day: 'M', done: true }, { day: 'X', done: true }, { day: 'J', done: true },
    { day: 'V', done: false }, { day: 'S', done: false }, { day: 'D', done: false },
  ],
  longestStreak: 14,

  skincare: {
    period: 'am',
    // Only used when notif.cats.sun is on — daily push reminder time
    spfReminderTime: '08:00',
    // Replaced with the real personalized routine once onboarding completes
    // (see personalizeSkincare in utils/templates.js) — stays empty until
    // then, since Piel isn't reachable before onboardingDone anyway.
    am: [],
    pm: [],
    // Past 7 days AM/PM completion — used to compute the weekly skincare stat on Progreso
    history: [
      { day: 'L', am: true, pm: true }, { day: 'M', am: true, pm: false }, { day: 'X', am: true, pm: true },
      { day: 'J', am: false, pm: false }, { day: 'V', am: true, pm: true }, { day: 'S', am: true, pm: true },
      { day: 'D', am: false, pm: true },
    ],
  },
  newStepText: '',

  // Settings
  acctEmail: '',
  legalOpen: null,
  lastUpdateCheck: '09 ago 2026',
  soundVolume: 50,
  settingsOpen: { cuenta: false, notif: false, sonido: false, general: false, soporte: false, acerca: false },
  generalSubOpen: { export: false, delete: false },
  notif: {
    master: true,
    dnd: true,
    dndFrom: '22:00',
    dndTo: '08:00',
    dndDays: { L: true, M: true, X: true, J: true, V: true, S: true, D: true },
    // Personalized from onboarding answers once onboarding completes (see personalizeNotifCats)
    cats: { meds: true, sun: true, water: false, exercise: true, diary: false },
    vib: { meds: false, sun: false, water: false, exercise: false, diary: false },
  },

  // Hoy Importa (devocional)
  devocionalIdx: new Date().getDay(),
  devocionalRead: false,

  // Diario & emociones
  diary: {
    mood: null,
    text: '',
    entries: [
      { id: 1, date: 'ayer', mood: '😊', text: 'Hoy me sentí productiva y en calma.' },
      { id: 2, date: 'hace 2 días', mood: '😴', text: 'Cansada pero agradecida por el día.' },
    ],
  },

  // Salud bottom sheet
  saludModalOpen: false,

  // Notificaciones
  notifFeed: [
    { isMed: true, title: 'Hora de tu Anticonceptivo', desc: '1 píldora · 08:00 · con el desayuno', time: '8:02 a.m.' },
    { isSun: true, title: 'Bloqueador solar', desc: 'No olvides tu SPF 50+ antes de salir', time: '9:15 a.m.' },
    { isWater: true, title: '¡Vas bien con el agua!', desc: 'Llevas 60% de tu meta diaria', time: '11:40 a.m.' },
    { isStreak: true, title: 'Racha activa', desc: 'Llevas 12 días seguidos cuidándote', time: 'Ayer' },
  ],
};

function loadInitialState() {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      // Nested objects need their own merge so newly added default fields
      // (e.g. skincare.history) survive over older persisted state shapes.
      skincare: { ...defaultState.skincare, ...(parsed.skincare || {}) },
      settingsOpen: { ...defaultState.settingsOpen, ...(parsed.settingsOpen || {}) },
      generalSubOpen: { ...defaultState.generalSubOpen, ...(parsed.generalSubOpen || {}) },
      notif: {
        ...defaultState.notif,
        ...(parsed.notif || {}),
        dndDays: { ...defaultState.notif.dndDays, ...((parsed.notif && parsed.notif.dndDays) || {}) },
        cats: { ...defaultState.notif.cats, ...((parsed.notif && parsed.notif.cats) || {}) },
        vib: { ...defaultState.notif.vib, ...((parsed.notif && parsed.notif.vib) || {}) },
      },
    };
  } catch {
    return defaultState;
  }
}

export function useAppState() {
  const [state, setState] = useState(loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage unavailable (private mode, etc.) — persistence is best-effort
    }
  }, [state]);

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));
  }, []);

  const toggleInArray = useCallback((key, value) => {
    setState((prev) => {
      const arr = prev[key] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  }, []);

  const resetState = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (private mode, etc.) — reset still applies in-memory
    }
    setState(defaultState);
  }, []);

  return { state, update, toggleInArray, resetState };
}
