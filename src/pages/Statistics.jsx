import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';

function Statistics() {
  const { statistics, progress } = useTechnologies();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Статистика</h1>
        <Link to="/technologies" className="button">
          ← Назад к списку
        </Link>
      </div>

      <div className="statistics">
        <div className="stats-overview">
          <div className="stat-card large">
            <h3>Общий прогресс</h3>
            <ProgressBar 
              progress={progress}
              label=""
              color="#4CAF50"
              animated={true}
              height={30}
              showPercentage={true}
            />
            <div className="progress-stats">
              <div className="progress-item">
                <span className="progress-label">Завершено:</span>
                <span className="progress-value">{statistics.completed}</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">В процессе:</span>
                <span className="progress-value">{statistics.inProgress}</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Не начато:</span>
                <span className="progress-value">{statistics.notStarted}</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Всего:</span>
                <span className="progress-value">{statistics.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>По категориям</h3>
            {Object.keys(statistics.byCategory).length > 0 ? (
              <div className="category-stats">
                {Object.entries(statistics.byCategory).map(([category, count]) => (
                  <div key={category} className="category-item">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Нет данных по категориям</p>
            )}
          </div>

          <div className="stat-card">
            <h3>По сложности</h3>
            {Object.keys(statistics.byDifficulty).length > 0 ? (
              <div className="difficulty-stats">
                {Object.entries(statistics.byDifficulty).map(([difficulty, count]) => (
                  <div key={difficulty} className="difficulty-item">
                    <span className="difficulty-name">
                      {difficulty === 'beginner' && 'Начинающий'}
                      {difficulty === 'intermediate' && 'Средний'}
                      {difficulty === 'advanced' && 'Продвинутый'}
                    </span>
                    <span className="difficulty-count">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Нет данных по сложности</p>
            )}
          </div>
        </div>

        <div className="completion-stats">
          <div className="stat-card">
            <h3>Процент завершения</h3>
            <div className="completion-grid">
              <div className="completion-item">
                <div className="completion-circle">
                  <span className="completion-percent">
                    {statistics.total > 0 ? Math.round((statistics.completed / statistics.total) * 100) : 0}%
                  </span>
                </div>
                <span className="completion-label">Завершено</span>
              </div>
              <div className="completion-item">
                <div className="completion-circle">
                  <span className="completion-percent">
                    {statistics.total > 0 ? Math.round((statistics.inProgress / statistics.total) * 100) : 0}%
                  </span>
                </div>
                <span className="completion-label">В процессе</span>
              </div>
              <div className="completion-item">
                <div className="completion-circle">
                  <span className="completion-percent">
                    {statistics.total > 0 ? Math.round((statistics.notStarted / statistics.total) * 100) : 0}%
                  </span>
                </div>
                <span className="completion-label">Не начато</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;