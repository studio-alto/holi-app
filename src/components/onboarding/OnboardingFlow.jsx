import { OnboardingTopbar, ProgressBar } from './shared';
import Step0Welcome from './Step0Welcome';
import Step1Profile from './Step1Profile';
import Step2Water from './Step2Water';
import Step3Meds from './Step3Meds';
import Step4Skin from './Step4Skin';
import Step5Exercise from './Step5Exercise';
import Step6Summary from './Step6Summary';
import Step7Paywall from './Step7Paywall';
import { personalizeNotifCats } from '../../utils/settings';
import { personalizeMeds, personalizeSkincare } from '../../utils/templates';

const PROGRESS_PCT = [14, 28, 42, 57, 71, 85, 100];

// Turns the onboarding answers into the real starting data for
// Medicamentos/Piel/Notificaciones, instead of always seeding the same
// generic sample content regardless of what the person answered.
function personalize(prev) {
  return {
    notif: { ...prev.notif, cats: personalizeNotifCats(prev) },
    meds: personalizeMeds(prev),
    skincare: { ...prev.skincare, ...personalizeSkincare(prev) },
  };
}

export default function OnboardingFlow({ state, update, toggleInArray }) {
  const step = state.onboardingStep;

  const obNext = () => update((prev) => ({ onboardingStep: Math.min(prev.onboardingStep + 1, 7) }));
  const obBack = () => update((prev) => ({ onboardingStep: Math.max(prev.onboardingStep - 1, 0) }));
  const obSkip = () =>
    update((prev) => ({
      onboardingDone: true,
      onboardingStep: 0,
      screen: 'home',
      ...personalize(prev),
    }));
  const obGoStart = () => update({ onboardingStep: 1 });
  const obContinueFree = () =>
    update((prev) => ({
      obPlanType: 'free',
      onboardingDone: true,
      onboardingStep: 0,
      screen: 'home',
      ...personalize(prev),
    }));
  const obStartPremium = () =>
    update((prev) => ({
      obPlanType: prev.obPlan,
      onboardingDone: true,
      onboardingStep: 0,
      screen: 'home',
      ...personalize(prev),
    }));

  const showTopbar = step >= 1 && step <= 6;

  return (
    <div className="fade-in-up" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {showTopbar && (
        <>
          <OnboardingTopbar stepLabel={`${step} de 7`} showBack onBack={obBack} />
          <ProgressBar pct={PROGRESS_PCT[step - 1] ?? 0} />
        </>
      )}

      {step === 0 && <Step0Welcome state={state} update={update} onNext={obNext} onSkip={obSkip} />}
      {step === 1 && <Step1Profile state={state} update={update} onNext={obNext} onBack={obBack} />}
      {step === 2 && <Step2Water state={state} update={update} onNext={obNext} onBack={obBack} />}
      {step === 3 && <Step3Meds state={state} update={update} toggleInArray={toggleInArray} onNext={obNext} onBack={obBack} />}
      {step === 4 && <Step4Skin state={state} update={update} toggleInArray={toggleInArray} onNext={obNext} onBack={obBack} />}
      {step === 5 && <Step5Exercise state={state} update={update} toggleInArray={toggleInArray} onNext={obNext} onBack={obBack} />}
      {step === 6 && <Step6Summary state={state} onNext={obNext} onEdit={obGoStart} />}
      {step === 7 && <Step7Paywall state={state} update={update} onStartPremium={obStartPremium} onContinueFree={obContinueFree} />}
    </div>
  );
}
