<template>
  <div class="fire-visual-container">
    <div class="input-container">
      <input
        v-model="newItem"
        type="text"
        placeholder="Type something..."
        class="input-field"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <button @click="addItem" class="add-button">+</button>
    </div>
    <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestion-list">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        class="suggestion-item"
        @click="addSuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
    <ul class="item-list">
      <li v-for="(item, index) in items" :key="index" class="list-item">
        {{ item }}
      </li>
    </ul>
    <div class="fire-image-container">
      <img src="../assets/fire-image.jpg" alt="Fire" class="fire-image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: '', // Holds the current input value
      items: [], // Holds the list of items
      suggestions: ["Love God with all your heart.", "Be brave"], // Pre-determined suggestions
      showSuggestions: false, // Controls the visibility of the suggestion dropdown
    };
  },
  computed: {
    filteredSuggestions() {
      // Filter suggestions to exclude already added items
      return this.suggestions.filter((suggestion) => !this.items.includes(suggestion));
    },
  },
  methods: {
    addItem() {
      if (this.newItem.trim() !== '') {
        this.items.push(this.newItem.trim()); // Add the trimmed input value to the list
        this.newItem = ''; // Clear the input field
      }
    },
    addSuggestion(suggestion) {
      this.items.push(suggestion); // Add the clicked suggestion to the list
      this.suggestions = this.suggestions.filter((item) => item !== suggestion); // Remove the suggestion
      this.showSuggestions = false; // Hide the suggestions
    },
    hideSuggestions() {
      // Delay hiding suggestions to allow click events to register
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },
  },
};
</script>

<style scoped>
.fire-visual-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.input-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  position: relative;
}

.input-field {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.add-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.suggestion-list {
  position: absolute;
  top: calc(100% + 4px); /* Ensure it appears directly below the input field */
  left: 0;
  width: 100%; /* Match the width of the input box */
  max-width: 400px;
  background-color: #f9f9f9; /* Match the list item background */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
  background-color: #f9f9f9; /* Match the list item background */
  color: #333; /* Match the list item text color */
}

.suggestion-item:hover {
  background-color: #e0e0e0; /* Slightly darker hover effect */
}

.item-list {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
}

.list-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  color: #333;
}

.fire-image-container {
  margin-top: 20px;
  text-align: center;
}

.fire-image {
  display: block;
  margin: 0 auto;
  width: 20%;
  border: 2px solid white;
  border-radius: 2px;
}
</style>