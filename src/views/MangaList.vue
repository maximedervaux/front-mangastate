<template>
  <div class='container'>
    <h1>🔎 Vous recherchez : <span style="color:#FFCF00; font-weight: 500;font-style: italic;">"{{ route.query.q }}"</span></h1>
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MangaCard from '../components/Manga/MangaCard.vue';
import apiMangaService from '../common/apiManga.service';

const mangas = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
let page = 1;

const fetchMangaQuery = async (query) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await apiMangaService.getMangaByTitle(query, { page: page, limit: 100 });
    mangas.value = response.data.items;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    fetchMangaQuery(newQuery);
  }
});

onMounted(() => {
  if (route.query.q) {
    fetchMangaQuery(route.query.q);
  }
});
</script>

<style scoped>
.manga-list-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 16px;
}

.container{
  margin: 0px 5px;
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
