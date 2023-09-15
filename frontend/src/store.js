import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // Return undefined to use the default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined; // Handle errors by returning undefined
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Handle errors here
  }
};

const initialState = loadState() || {}; // Initialize with saved state or an empty object

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(applyMiddleware(...middleware)),
  preloadedState: initialState,
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
