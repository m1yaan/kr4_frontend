import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    
    // Создание и скачивание файла
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `technologies-export-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn btn-success">
          ☑ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="btn btn-warning">
          ☒ Сбросить все статусы
        </button>
        <button onClick={handleExport} className="btn btn-info">
          📤 Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>Данные успешно экспортированы!</p>
        <p>Файл с технологиями скачан на ваше устройство.</p>
        <button onClick={() => setShowExportModal(false)}>
          Закрыть
        </button>
      </Modal>
    </div>
  );
}

export default QuickActions;