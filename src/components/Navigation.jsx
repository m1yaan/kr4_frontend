import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          <h2>💻 Трекер технологий</h2>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link 
              to="/technologies" 
              className={`nav-link ${location.pathname === '/technologies' ? 'active' : ''}`}
            >
              Все технологии
            </Link>
          </li>
          <li>
            <Link 
              to="/add-technology" 
              className={`nav-link ${location.pathname === '/add-technology' ? 'active' : ''}`}
            >
              Добавить технологию
            </Link>
          </li>
          <li>
            <Link 
              to="/statistics" 
              className={`nav-link ${location.pathname === '/statistics' ? 'active' : ''}`}
            >
              Статистика
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;