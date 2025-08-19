import './app/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
<<<<<<< Updated upstream
    <App />
);
=======
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> Stashed changes
