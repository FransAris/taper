import React from 'react';
import { MedDataProvider } from '../context/MedDataContext';
import { TabView } from './TabView';

export function App() {
  return (
    <MedDataProvider>
      <div className="app">
        <header>
          <h1>Medication Tracker</h1>
        </header>
        
        <main>
          <TabView />
        </main>
      </div>
    </MedDataProvider>
  );
} 