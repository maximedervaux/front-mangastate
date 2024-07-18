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
        // console.log(response);
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

const scrollAmount = ref(0);
const itemWidth = 160; 
const itemsToScroll = 3; 

const scrollRight = () => {
    scrollAmount.value += itemWidth * itemsToScroll;
    document.querySelector('.manga-list').scrollTo({
        left: scrollAmount.value,
        behavior: 'smooth'
    });
};

const scrollLeft = () => {
    scrollAmount.value -= itemWidth * itemsToScroll;
    if (scrollAmount.value < 0) scrollAmount.value = 0;
    document.querySelector('.manga-list').scrollTo({
        left: scrollAmount.value,
        behavior: 'smooth'
    });
};

   

    
</script>


<template>
    <h1>{{ title }}</h1>
    <div class="manga-list-container"> 
      <button @click="scrollLeft" class="scroll-button left">⬅️</button>
      <div class="manga-list">
        <MangaCard v-for="manga in mangas" :key="manga.id_manga" :title="manga.title_manga" :image_link="manga.cover_image_manga" :id_manga="manga.id_manga" />
      </div>
      <button @click="scrollRight" class="scroll-button right">➡️</button>

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
  
  .manga-list {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: hidden;
      gap: 1rem;
      padding: 1rem;
      scroll-behavior: smooth;
  }
  
  .scroll-button {
      background-color: #333;
      color: #fff;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
  }
  
  .scroll-button.left {
      left: 0;
  }
  
  .scroll-button.right {
      right: 0;
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
  