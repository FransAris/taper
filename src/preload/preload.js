const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

console.log('Preload script starting...', new Date().toISOString());

// Add a test API that we can check from the renderer
contextBridge.exposeInMainWorld('electronTest', {
  ping: () => 'pong'
});

let store;
try {
  console.log('Attempting to require electron-store...');
  const Store = require('electron-store');
  console.log('electron-store loaded successfully');

  store = new Store({
    name: 'medication-data',
    cwd: path.join(__dirname, '../../'),
    defaults: {
      doses: [],
      settings: {
        defaultMedication: 'Diazepam',
        graphDays: 7
      }
    }
  });
  console.log('Store initialized successfully');
} catch (error) {
  console.error('Failed to initialize store:', error);
  store = new Map();
}

const storeAPI = {
  get: (key) => {
    try {
      return store instanceof Map ? store.get(key) : store.get(key);
    } catch (error) {
      console.error(`Error getting ${key} from store:`, error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      store instanceof Map ? store.set(key, value) : store.set(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in store:`, error);
    }
  },
  addDose: (dose) => {
    try {
      const doses = storeAPI.get('doses') || [];
      storeAPI.set('doses', [...doses, { ...dose, id: Date.now() }]);
    } catch (error) {
      console.error('Error adding dose:', error);
    }
  },
  updateDose: (id, updatedDose) => {
    try {
      const doses = storeAPI.get('doses') || [];
      storeAPI.set('doses', doses.map(dose => 
        dose.id === id ? { ...updatedDose, id } : dose
      ));
    } catch (error) {
      console.error('Error updating dose:', error);
    }
  },
  deleteDose: (id) => {
    try {
      const doses = storeAPI.get('doses') || [];
      storeAPI.set('doses', doses.filter(dose => dose.id !== id));
    } catch (error) {
      console.error('Error deleting dose:', error);
    }
  }
};

try {
  console.log('Exposing electron API to renderer...');
  contextBridge.exposeInMainWorld('electron', { store: storeAPI });
  console.log('API exposed successfully');
} catch (error) {
  console.error('Failed to expose API:', error);
} 