import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { 
    allTechnologies, 
    updateStatus, 
    updateNotes,
    deleteTechnology 
  } = useTechnologies();
  
  const [technology, setTechnology] = useState(null);
  const [localNotes, setLocalNotes] = useState('');

  useEffect(() => {
    const tech = allTechnologies.find(t => t.id === parseInt(techId));
    if (tech) {
      setTechnology(tech);
      setLocalNotes(tech.notes || '');
    }
  }, [techId, allTechnologies]);

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(techId), newStatus);
    setTechnology(prev => ({ ...prev, status: newStatus }));
  };

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setLocalNotes(newNotes);
    updateNotes(parseInt(techId), newNotes);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      deleteTechnology(parseInt(techId));
      navigate('/technologies');
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="button">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="button">
          ← Назад к списку
        </Link>
        <div className="actions">
          <button onClick={handleDelete} className="button button--danger">
            Удалить
          </button>
        </div>
      </div>

      <div className="technology-detail">
        <div className="detail-header">
          <h1>{technology.title}</h1>
          <span className={`status-badge status-${technology.status}`}>
            {technology.status === 'not-started' && 'Не начато'}
            {technology.status === 'in-progress' && 'В процессе'}
            {technology.status === 'completed' && 'Завершено'}
          </span>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>Описание</h3>
            <p>{technology.description}</p>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <strong>Категория:</strong>
              <span>{technology.category}</span>
            </div>
            <div className="meta-item">
              <strong>Сложность:</strong>
              <span>{technology.difficulty}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Статус изучения</h3>
            <div className="status-buttons">
              <button
                onClick={() => handleStatusChange('not-started')}
                className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
              >
                Не начато
              </button>
              <button
                onClick={() => handleStatusChange('in-progress')}
                className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
              >
                В процессе
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
              >
                Завершено
              </button>
            </div>
          </div>

          <div className="detail-section">
            <h3>Мои заметки</h3>
            <textarea
              value={localNotes}
              onChange={handleNotesChange}
              placeholder="Записывайте сюда важные моменты..."
              rows="6"
              className="notes-textarea"
            />
          </div>

          {technology.resources && technology.resources.length > 0 && (
            <div className="detail-section">
              <h3>Ресурсы для изучения</h3>
              <div className="resources-list">
                {technology.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {resource}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;