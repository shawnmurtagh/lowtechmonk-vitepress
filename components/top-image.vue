<template>
  <div class="image-container">
    <img :src="imagePath" alt="Centered Image" class="centered-image" />
  </div>
</template>

<script>
export default {
  props: {
    imagePath: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.centered-image {
  width: 100%; /* 75% of the page's width */
  border: 10px solid black; /* Indigo border of 10px */
  border-radius: 8px; /* Optional: Slightly rounded corners */
  object-fit: cover;
}
</style>