import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource-variable/atkinson-hyperlegible-next';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('raiz')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
