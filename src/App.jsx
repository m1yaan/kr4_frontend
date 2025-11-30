import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import RegistrationForm from './components/RegistrationForm';
import ColorPicker from './components/ColorPicker';
import WindowSizeTracker from './components/WindowSizeTracker';
import UserProfile from './components/UserProfile';
import ContactForm from './components/ContactForm';
import UserList from './components/UserList';
import ProductSearch from './components/ProductSearch';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
          <section className="practice-components">
            <Greeting />
            <Counter />
            <RegistrationForm />
            <ColorPicker />
            <WindowSizeTracker />
            <UserProfile />
            <ContactForm />
            <UserList />
            <ProductSearch />
            <PostList />
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;