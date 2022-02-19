import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DnD from './components/dnd';
import './index.scss'
import 'animate.css'
import 'normalize.css'

const rootElement = document.getElementById('root');
render(
  <BrowserRouter basename='/dnd-task-management'>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="task" element={<DnD />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
