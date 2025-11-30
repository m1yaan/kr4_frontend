import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import QuickActions from '../components/QuickActions';

function Home() {
  const { 
    technologies, 
    progress, 
    statistics,
    markAllCompleted, 
    resetAllStatuses 
  } = useTechnologies();

  const recentTechnologies = technologies.slice(0, 3);

  // Защита от undefined - используем значения по умолчанию
  const safeStats = statistics || {
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Главная - Трекер изучения технологий</h1>
        <Link to="/add-technology" className="button button--primary">
          + Добавить технологию
        </Link>
      </div>

      <div className="dashboard">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Общий прогресс</h3>
            <ProgressBar 
              progress={progress}
              label="Общий прогресс"
              color="#4CAF50"
              animated={true}
              height={25}
            />
          </div>

          <div className="stat-card">
            <h3>Статистика</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{safeStats.total}</span>
                <span className="stat-label">Всего</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{safeStats.completed}</span>
                <span className="stat-label">Завершено</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{safeStats.inProgress}</span>
                <span className="stat-label">В процессе</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{safeStats.notStarted}</span>
                <span className="stat-label">Не начато</span>
              </div>
            </div>
          </div>
        </div>

        <QuickActions 
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAllStatuses}
          technologies={technologies}
        />

        <div className="recent-technologies">
          <h2>Недавние технологии</h2>
          {recentTechnologies.length > 0 ? (
            <div className="technologies-grid">
              {recentTechnologies.map(tech => (
                <div key={tech.id} className="technology-card-mini">
                  <h4>{tech.title}</h4>
                  <span className={`status-badge status-${tech.status}`}>
                    {tech.status === 'not-started' && 'Не начато'}
                    {tech.status === 'in-progress' && 'В процессе'}
                    {tech.status === 'completed' && 'Завершено'}
                  </span>
                  <p>{tech.description}</p>
                  <Link to={`/technology/${tech.id}`} className="view-details">
                    Подробнее →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Технологий пока нет. Добавьте первую!</p>
              <Link to="/add-technology" className="button button--primary">
                Добавить технологию
              </Link>
            </div>
          )}
          
          {technologies.length > 3 && (
            <div className="view-all">
              <Link to="/technologies" className="button">
                Посмотреть все технологии ({technologies.length})
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;