import React from 'react';
import { useMedData } from '../context/MedDataContext';
import { BENZODIAZEPINES } from '../utils/medications';

export function Settings() {
  const { settings, updateSettings } = useMedData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSettings({
      ...settings,
      [name]: value
    });
  };

  return (
    <div className="settings">
      <h3>Settings</h3>
      
      <div className="form-group">
        <label>Default Medication:</label>
        <select
          name="defaultMedication"
          value={settings.defaultMedication}
          onChange={handleChange}
        >
          {BENZODIAZEPINES.map(med => (
            <option key={med.name} value={med.name}>
              {med.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Graph Days to Show:</label>
        <select
          name="graphDays"
          value={settings.graphDays}
          onChange={handleChange}
        >
          <option value="1">1 Day</option>
          <option value="3">3 Days</option>
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>
    </div>
  );
} 