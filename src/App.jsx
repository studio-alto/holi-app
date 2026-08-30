import './styles/tokens.css';
import { useAppState } from './state/useAppState';
import { useToasts } from './state/useToasts';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import MainApp from './components/home/MainApp';
import ToastStack from './components/shared/ToastStack';

export default function App() {
  const { state, update, toggleInArray, resetState } = useAppState();
  const { toasts, addToast } = useToasts();
  const isOnboarding = !state.onboardingDone;

  return (
    <div className="app-shell">
      <div className="phone-card">
        {isOnboarding ? (
          <OnboardingFlow state={state} update={update} toggleInArray={toggleInArray} />
        ) : (
          <MainApp state={state} update={update} addToast={addToast} resetState={resetState} />
        )}
        <ToastStack toasts={toasts} />
      </div>
    </div>
  );
}
