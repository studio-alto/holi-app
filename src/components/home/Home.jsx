import CategoryCard from './CategoryCard';
import { DropIcon, PillIcon, ExerciseIcon, SkinIcon, ArrowRightIcon, SparkleIcon } from '../icons/Icons';
import { computeExerciseDerived } from '../../utils/exercise';
import { computeSkinDerived } from '../../utils/skincare';
import { computeDevocionalDerived } from '../../utils/devocional';

export default function Home({ state, onNavigate }) {
  const medWeekPct = state.medWeekPct;
  const { exDoneCount, exTotalCount } = computeExerciseDerived(state);
  const { homeSkinNextText } = computeSkinDerived(state);
  const { teaser: devocionalTeaser } = computeDevocionalDerived(state);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
        Hola, hoy es un buen día
        <SparkleIcon />
      </div>

      <button
        onClick={() => onNavigate('devocional')}
        style={{ textAlign: 'left', border: '0.5px solid #FFFFFF', borderRadius: 18, padding: 18, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', opacity: 0.94, backgroundColor: '#000000' }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#D0F8FA', letterSpacing: 0.4 }}>HOY IMPORTA</div>
        <div style={{ fontWeight: 400, fontSize: 16, color: '#FFFFFF', marginTop: 6, lineHeight: 1.5 }}>&ldquo;{devocionalTeaser}&rdquo;</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: '#fff', color: '#000', padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
            Ir <ArrowRightIcon />
          </div>
        </div>
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <CategoryCard
          title="Agua"
          value={`${state.waterTodayMl} ml`}
          unit="hoy"
          bg="#C9E4F0"
          icon={<DropIcon size={19} color="#1B5C7A" strokeWidth={1.8} />}
          onClick={() => onNavigate('agua')}
        />
        <CategoryCard
          title="Medicamentos"
          value={`${medWeekPct}%`}
          unit="semana"
          bg="#DED2EE"
          icon={<PillIcon size={19} color="#5B3E82" strokeWidth={1.8} />}
          onClick={() => onNavigate('meds')}
        />
        <CategoryCard
          title="Ejercicio"
          value={`${exDoneCount}/${exTotalCount}`}
          unit="hoy"
          bg="#D8E8C4"
          icon={<ExerciseIcon size={19} color="#456022" strokeWidth={1.8} />}
          onClick={() => onNavigate('ejercicio')}
        />
        <CategoryCard
          title="Piel"
          value={homeSkinNextText}
          bg="#F3E1CC"
          icon={<SkinIcon size={19} color="#8A5A24" strokeWidth={1.8} />}
          onClick={() => onNavigate('piel')}
        />
      </div>

      <button
        onClick={() => onNavigate('diario')}
        style={{ textAlign: 'left', border: '0.5px solid var(--border)', borderRadius: 18, padding: 16, cursor: 'pointer', backgroundColor: 'var(--surface)' }}
      >
        <div style={{ fontSize: 14, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ¿Cómo te sientes hoy? Escribe en tu diario
          <ArrowRightIcon size={16} color="var(--text-2)" />
        </div>
      </button>
    </div>
  );
}
