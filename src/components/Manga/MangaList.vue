<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MangaCard from './MangaCard.vue';
import ApiService from '../../common/api.service';

const mangas = ref([]);
const loading = ref(true);
const error = ref(null);
let page = 1;

const props = defineProps({
  title : String 
});

const fetchMangas = async (page) => {
    try {
        const response = await ApiService.query('manga', { page: page, limit: 10 });
        console.log(response);
        mangas.value = response.items;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchMangas(page);
});
    
</script>


<template>
    <H1>{{ title }}</H1>
    <div class="manga-list-container"> 
      <MangaCard v-for="manga in mangas" :key="manga.id_manga" :title="manga.title_manga" :image_link="manga.cover_image_manga" :id="manga.id_manga" />
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
  

  <style scoped>
  .manga-list-container {
      display: flex;
      align-items: center;
      position: relative;
    
  }

  .loading,
.error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.5em;
}
  </style>
  