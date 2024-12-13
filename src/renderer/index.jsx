import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './styles.css';

console.log('Starting React app...');

const container = document.getElementById('root');
console.log('Root container:', container);

if (!container) {
  console.error('Root element not found!');
} else {
  console.log('Creating React root...');
  const root = createRoot(container);
  console.log('Rendering app...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} 