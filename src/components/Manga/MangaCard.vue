<!-- MangaCard.vue -->
<template>
  <router-link class="card" :to="{ name: 'Manga', params: { id_manga: id_manga } }">
    <img :src="image_link" alt="Manga Image" class="manga-image"/>
    <div class="title">{{ title }}</div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  image_link: String,
  title: String,
  id_manga: Number,
});
</script>

<style scoped>
.card {
  background-color: #49454F;
  min-width: 133px;
  max-width: 133px;
  height: 200px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  transition: transform 0.2s;
  position: relative;
}
.card:hover {
  transform: scale(1.05);
}
.card:hover > .title {
  opacity:1;
  transition-duration: 0.5s;
}

.manga-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.title {
  color: #ffffff;
  font-size: 1em;
  text-align: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  padding: 5px 0;
  transition: opacity 0.5s;
}

@media (max-width: 768px) {
  .card {
    max-width: 100px;
    max-height: 150px;
  }
  .title {
    font-size: 0.8em;
  }
}
</style>
