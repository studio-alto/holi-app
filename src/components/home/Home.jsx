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
          iconBg={{ bubble: '#AFD3F0' }}
          icon={<DropIcon size={20} color="#1f5a86" strokeWidth={1.8} />}
          onClick={() => onNavigate('agua')}
        />
        <CategoryCard
          title="Medicamentos"
          value={`${medWeekPct}%`}
          unit="semana"
          iconBg={{ bubble: '#D6C6F5' }}
          icon={<PillIcon size={20} color="#5f4a91" strokeWidth={1.8} />}
          onClick={() => onNavigate('meds')}
        />
        <CategoryCard
          title="Ejercicio"
          value={`${exDoneCount}/${exTotalCount}`}
          unit="hoy"
          iconBg={{ bubble: '#C3E293' }}
          icon={<ExerciseIcon size={20} color="#456332" strokeWidth={1.8} />}
          onClick={() => onNavigate('ejercicio')}
        />
        <CategoryCard
          title="Piel"
          value={homeSkinNextText}
          iconBg={{ bubble: '#F7C89A' }}
          icon={<SkinIcon size={20} color="#a35b23" strokeWidth={1.8} />}
          onClick={() => onNavigate('piel')}
        />
      </div>

      <button
        onClick={() => onNavigate('diario')}
        style={{ textAlign: 'left', border: '0.5px solid #EFE9D8', borderRadius: 18, padding: 16, cursor: 'pointer', backgroundColor: '#FFFFFF' }}
      >
        <div style={{ fontSize: 14, color: '#8A8474', display: 'flex', alignItems: 'center', gap: 8 }}>
          ¿Cómo te sientes hoy? Escribe en tu diario
          <ArrowRightIcon size={16} color="#8A8474" />
        </div>
      </button>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => onNavigate('progreso')}
          style={{ flex: 1, padding: '12px 12px', background: '#000000', border: 'none', color: '#FFFFFF', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
        >
          Progreso
        </button>
        <button
          onClick={() => onNavigate('settings')}
          style={{ flex: 1, padding: '12px 12px', background: 'transparent', border: '1.5px solid #000000', color: '#000000', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
        >
          Configuración
        </button>
      </div>
    </div>
  );
}
