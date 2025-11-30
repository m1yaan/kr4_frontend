import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyCard from '../components/TechnologyCard';
import ProgressBar from '../components/ProgressBar';

function TechnologyList() {
  const {
    technologies,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    updateStatus,
    updateNotes,
    progress
  } = useTechnologies();

  const statusFilters = [
    { value: 'all', label: 'Все' },
    { value: 'not-started', label: 'Не начатые' },
    { value: 'in-progress', label: 'В процессе' },
    { value: 'completed', label: 'Завершенные' }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="button button--primary">
          + Добавить технологию
        </Link>
      </div>

      <div className="technology-list">
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Поиск технологий..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="status-filters">
            {statusFilters.map(filter => (
              <button
                key={filter.value}
                className={`filter-btn ${filterStatus === filter.value ? 'active' : ''}`}
                onClick={() => setFilterStatus(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="progress-section">
            <ProgressBar
              progress={progress}
              label="Общий прогресс"
              color="#2196F3"
              height={20}
            />
          </div>
        </div>

        <div className="results-info">
          <p>Найдено технологий: {technologies.length}</p>
        </div>

        <div className="technologies-grid">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          ))}
        </div>

        {technologies.length === 0 && (
          <div className="empty-state">
            <p>Технологии не найдены</p>
            <Link to="/add-technology" className="button button--primary">
              Добавить первую технологию
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyList;