import React from 'react';
import { useMedData } from '../context/MedDataContext';

export function MedicationTable() {
  const { doses } = useMedData();

  return (
    <div>
      <h2>Medication Log</h2>
      <table className="medication-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Medication</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {doses.map(dose => {
            const date = new Date(dose.timestamp);
            return (
              <tr key={dose.id}>
                <td>{date.toLocaleDateString()}</td>
                <td>{date.toLocaleTimeString()}</td>
                <td>{dose.medicationName}</td>
                <td>{dose.amount}mg</td>
                <td>{dose.notes || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 