<template>
    <div class="circle-container">
        <div class="icon-container">
            <span class="fire-icon">🔥</span>
            <button @click="addCoreValue" class="add-button">+</button>
            <div v-if="showDetails" class="details">
                <ul>
                    <li v-for="(value, index) in coreValues" :key="index">{{ value }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store.js';
import { computed } from 'vue';
console.log(store.coreValues[0]);

export default {
    setup() {
    const coreValues = computed(() => store.coreValues);
    const addCoreValue = () => {
      const newValue = prompt("Enter a new core value:");
      if (newValue) {
        store.coreValues.push(newValue);
      }
    };

    return { coreValues, addCoreValue };
  },
};
</script>

<style scoped>
.circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
}

.icon-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px; /* Space between fire icon and button */
    cursor: pointer;
}

.fire-icon {
    font-size: 48px;
}

.add-button {
    padding: 5px 10px;
    background-color: black; /* Black background */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add-button:hover {
    background-color: #333; /* Slightly lighter black on hover */
}

.details ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.details li {
    margin: 5px 0;
}
</style>