import { reactive, watch } from 'vue';

// Load initial data from localStorage or set defaults
const initialState = JSON.parse(localStorage.getItem('sharedStore')) || {
  coreValues: [],
};

// Create a reactive store
export const store = reactive(initialState);

// Persist changes to localStorage
watch(
  () => store,
  (newState) => {
    localStorage.setItem('sharedStore', JSON.stringify(newState));
  },
  { deep: true }
);