import { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const [showNotes, setShowNotes] = useState(false);

  const handleStatusChange = () => {
    const statuses = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statuses.indexOf(technology.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    onStatusChange(technology.id, statuses[nextIndex]);
  };

  const handleNotesChange = (e) => {
    onNotesChange(technology.id, e.target.value);
  };

  return (
    <div 
      className={`technology-card status-${technology.status}`}
      onClick={handleStatusChange}
    >
      <div className="technology-card__header">
        <h3 className="technology-card__title">{technology.title}</h3>
        <span className={`status-badge status-${technology.status}`}>
          {technology.status === 'not-started' && 'Не начато'}
          {technology.status === 'in-progress' && 'В процессе'}
          {technology.status === 'completed' && 'Завершено'}
        </span>
      </div>
      
      <p className="technology-card__description">{technology.description}</p>
      
      <div className="technology-card__meta">
        <span className="technology-category">{technology.category}</span>
        <span className="technology-difficulty">{technology.difficulty}</span>
      </div>

      <div className="technology-card__actions">
        <button 
          className="notes-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setShowNotes(!showNotes);
          }}
        >
          📝 Заметки
        </button>
      </div>

      {showNotes && (
        <div className="technology-card__notes" onClick={e => e.stopPropagation()}>
          <textarea
            value={technology.notes || ''}
            onChange={handleNotesChange}
            placeholder="Добавьте свои заметки..."
            rows="3"
          />
        </div>
      )}

      {technology.resources && technology.resources.length > 0 && (
        <div className="technology-card__resources">
          <strong>Ресурсы:</strong>
          <ul>
            {technology.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource} target="_blank" rel="noopener noreferrer">
                  {resource}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TechnologyCard;