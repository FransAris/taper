import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { StorageUtils } from '../utils/storage';
import { generateTimeSeriesData } from '../utils/calculations';

const MedDataContext = createContext();

export function MedDataProvider({ children }) {
  const [doses, setDoses] = useState([]);
  const [settings, setSettings] = useState({
    defaultMedication: 'Diazepam',
    graphDays: 7
  });

  // Load initial data
  useEffect(() => {
    const savedDoses = StorageUtils.getAllDoses();
    const savedSettings = StorageUtils.getSettings();
    setDoses(savedDoses || []);
    setSettings(savedSettings || {
      defaultMedication: 'Diazepam',
      graphDays: 7
    });
  }, []);

  // Generate time series data for the graph
  const timeSeriesData = useMemo(() => 
    generateTimeSeriesData(doses, settings.graphDays),
    [doses, settings.graphDays]
  );

  const addDose = (dose) => {
    StorageUtils.addDose(dose);
    setDoses(StorageUtils.getAllDoses());
  };

  const updateDose = (id, dose) => {
    StorageUtils.updateDose(id, dose);
    setDoses(StorageUtils.getAllDoses());
  };

  const deleteDose = (id) => {
    StorageUtils.deleteDose(id);
    setDoses(StorageUtils.getAllDoses());
  };

  const updateSettings = (newSettings) => {
    StorageUtils.updateSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <MedDataContext.Provider value={{
      doses,
      settings,
      timeSeriesData,
      addDose,
      updateDose,
      deleteDose,
      updateSettings
    }}>
      {children}
    </MedDataContext.Provider>
  );
}

export function useMedData() {
  return useContext(MedDataContext);
} 