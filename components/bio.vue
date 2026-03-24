<template>
  <div class="bio-container">
    <img :src="imagePath" alt="Profile Image" class="bio-image" />
    <div class="bio-content">
      <h3 class="bio-name">{{ name }}</h3>
      <p class="bio-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.bio-container {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: black; /* Black background */
  border: 1px solid #333; /* Dark border for subtle contrast */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Slightly darker shadow */
  margin: 16px 0;
}

.bio-image {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
}

.bio-content {
  flex: 1;
}

.bio-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: white; /* White text for the name */
}

.bio-description {
  font-size: 1rem;
  margin: 8px 0 0;
  color: #ccc; /* Light gray text for the description */
}
</style>