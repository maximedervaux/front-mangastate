<script setup>
import { ref, onMounted, watch } from 'vue';
import MangaCard from './MangaCard.vue';
import ApiService from '../../common/api.service';
import apiMangaService from '../../common/apiManga.service';

const mangas = ref([]);
const loading = ref(true);
const error = ref(null);
let page = 1;

const props = defineProps({
  title: String,
  searchQuery: String
});

const fetchMangas = async (page) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await ApiService.query('manga', { page: page, limit: 100 });
    console.log(response);
    mangas.value = response.items;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const fetchMangaQuery = async (query) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await apiMangaService.getMangaByTitle(query);
    console.log('Recherche par titre :', response);
    mangas.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

watch(() => props.searchQuery, (newQuery) => {
  if (newQuery) {
    fetchMangaQuery(newQuery);
  } else {
    fetchMangas(page);
  }
});

onMounted(() => {
  if (props.searchQuery) {
    fetchMangaQuery(props.searchQuery);
  } else {
    fetchMangas(page);
  }
});
</script>

<template>
  <H1>{{ title }}</H1>
  <div class="manga-list-container">
    <MangaCard
      v-for="manga in mangas"
      :key="manga.id_manga"
      :title="manga.title_manga"
      :image_link="manga.cover_image_manga"
      :id_manga="manga.id_manga"
    />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.manga-list-container {
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  gap: 1rem;
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
