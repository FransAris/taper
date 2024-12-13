import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { MedicationLogForm } from './MedicationLogForm';
import { Settings } from './Settings';
import { MedicationTable } from './MedicationTable';

export function TabView() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-container">
            <Dashboard />
            <MedicationTable />
          </div>
        );
      case 'log':
        return <MedicationLogForm />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="content-container">
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </div>
        <div 
          className={`tab ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          Log Medication
        </div>
        <div 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </div>
      </div>
      
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
} 