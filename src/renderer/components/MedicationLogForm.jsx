import React, { useState } from 'react';
import { useMedData } from '../context/MedDataContext';
import { BENZODIAZEPINES } from '../utils/medications';

export function MedicationLogForm() {
  const { addDose } = useMedData();
  const [formData, setFormData] = useState({
    medicationName: BENZODIAZEPINES[0].name,
    amount: BENZODIAZEPINES[0].commonDoses[0],
    timestamp: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:mm
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDose({
      ...formData,
      timestamp: new Date(formData.timestamp).getTime(),
      amount: parseFloat(formData.amount)
    });
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      amount: BENZODIAZEPINES[0].commonDoses[0],
      timestamp: new Date().toISOString().slice(0, 16),
      notes: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="medication-form">
      <h3>Log Medication</h3>
      
      <div className="form-group">
        <label>Medication:</label>
        <select
          name="medicationName"
          value={formData.medicationName}
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
        <label>Amount (mg):</label>
        <select
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        >
          {BENZODIAZEPINES.find(med => med.name === formData.medicationName)
            ?.commonDoses.map(dose => (
              <option key={dose} value={dose}>
                {dose} mg
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Time Taken:</label>
        <input
          type="datetime-local"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <button type="submit">Log Dose</button>
    </form>
  );
} 