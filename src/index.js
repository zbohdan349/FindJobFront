import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './style.css'

import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { VacancyPage } from './pages/VacancyPage';
import { LoginPage } from './pages/LoginPage';
import { SearchPage } from './pages/SearchPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

