import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    difficulty: 'beginner',
    resources: ['https://react.dev/learn']
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'in-progress',
    notes: '',
    category: 'frontend',
    difficulty: 'beginner',
    resources: ['https://react.dev/learn/writing-markup-with-jsx']
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    difficulty: 'intermediate',
    resources: ['https://react.dev/learn/state-a-components-memory']
  },
  {
    id: 4,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend',
    difficulty: 'beginner',
    resources: ['https://nodejs.org/en/docs/guides']
  },
  {
    id: 5,
    title: 'TypeScript',
    description: 'Типизированное надмножество JavaScript',
    status: 'completed',
    notes: 'Прошел базовый курс, нужно практиковаться',
    category: 'language',
    difficulty: 'intermediate',
    resources: ['https://www.typescriptlang.org/docs']
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || tech.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Функция для расчета статистики
  const getStatistics = () => {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
    const byCategory = technologies.reduce((acc, tech) => {
      acc[tech.category] = (acc[tech.category] || 0) + 1;
      return acc;
    }, {});

    const byDifficulty = technologies.reduce((acc, tech) => {
      acc[tech.difficulty] = (acc[tech.difficulty] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      completed,
      inProgress,
      notStarted,
      byCategory,
      byDifficulty
    };
  };

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const addTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      status: 'not-started',
      notes: ''
    };
    setTechnologies(prev => [...prev, newTech]);
    return newTech;
  };

  const deleteTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (importedTechnologies) => {
    setTechnologies(importedTechnologies);
  };

  return {
    technologies: filteredTechnologies,
    allTechnologies: technologies,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    updateStatus,
    updateNotes,
    addTechnology,
    deleteTechnology,
    progress: calculateProgress(),
    markAllCompleted,
    resetAllStatuses,
    exportData,
    importData,
    statistics: getStatistics() // Добавляем статистику здесь
  };
}

export default useTechnologies;