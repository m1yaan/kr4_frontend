import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'beginner',
    resources: ['']
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'database', label: 'Базы данных' },
    { value: 'devops', label: 'DevOps' },
    { value: 'tools', label: 'Инструменты' },
    { value: 'language', label: 'Языки программирования' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Начинающий' },
    { value: 'intermediate', label: 'Средний' },
    { value: 'advanced', label: 'Продвинутый' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }));
  };

  const addResourceField = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const techData = {
        ...formData,
        resources: formData.resources.filter(resource => resource.trim() !== '')
      };
      
      const newTech = addTechnology(techData);
      navigate(`/technology/${newTech.id}`);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
        <button onClick={() => navigate('/technologies')} className="button">
          ← Назад
        </button>
      </div>

      <form onSubmit={handleSubmit} className="add-technology-form">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="title">Название технологии *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Например: React, Node.js, TypeScript"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Опишите, что это за технология и для чего используется..."
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Категория</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Сложность</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label>Ресурсы для изучения</label>
          {formData.resources.map((resource, index) => (
            <div key={index} className="resource-field">
              <input
                type="url"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                placeholder="https://example.com"
                className="resource-input"
              />
              {formData.resources.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeResourceField(index)}
                  className="remove-resource"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addResourceField}
            className="button button--secondary"
          >
            + Добавить ресурс
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button--primary">
            Добавить технологию
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/technologies')}
            className="button"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;