export const StorageUtils = {
  getAllDoses: () => {
    if (!window.electron?.store) {
      console.error('Electron store not available');
      return [];
    }
    return window.electron.store.get('doses');
  },
  
  addDose: (dose) => {
    if (!window.electron?.store) {
      console.error('Electron store not available');
      return;
    }
    window.electron.store.addDose(dose);
  },
  
  updateDose: (id, updatedDose) => {
    if (!window.electron?.store) {
      console.error('Electron store not available');
      return;
    }
    window.electron.store.updateDose(id, updatedDose);
  },
  
  deleteDose: (id) => {
    if (!window.electron?.store) {
      console.error('Electron store not available');
      return;
    }
    window.electron.store.deleteDose(id);
  },
  
  getSettings: () => {
    if (!window.electron?.store) {
      console.error('Electron store not available');
      return {
        defaultMedication: 'Diazepam',
        graphDays: 7
      };
    }
    return window.electron.store.get('settings');
  },
  
  updateSettings: (settings) => {
    if (!window.electron?.store) {
      console.error('Electron store not available');
      return;
    }
    window.electron.store.set('settings', settings);
  }
}; 