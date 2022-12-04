import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './style.css'
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { VacancyPage } from './pages/VacancyPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route index path='/home' element={<HomePage />} />
    <Route index path='/test' element={<TestPage />} />
    <Route path='/vacancies/:vacancyId' element={<VacancyPage/>}/>
  </Routes>
</HashRouter>,
);

