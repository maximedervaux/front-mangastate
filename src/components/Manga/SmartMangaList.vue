<template>
  <div class="manga-list-container">
    <MangaCard
      v-for="manga in mangas"
      :key="manga.id_manga"
      :title="manga.title_manga"
      :image_link="manga.cover_image_manga"
      :id_manga="manga.id_manga"
      :selectable="true"
      @click="selectManga(manga)"
    />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps} from 'vue';
import MangaCard from './MangaCard.vue';
import apiMangaService from '../../common/apiManga.service';

const props = defineProps({
  searchQuery: String
});

const mangas = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchMangaQuery = async (query) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await apiMangaService.getExtraManga(query, { page: 1, limit: 6 });
    mangas.value = response.data.items;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const selectManga = (manga) => {
  emit('select-manga', manga);
};

watch(() => props.searchQuery, (newQuery) => {
  if (newQuery) {
    fetchMangaQuery(newQuery);
  }
});

// Fetch initial data
fetchMangaQuery(props.searchQuery);
</script>

<style scoped>
.manga-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 16px;
  justify-content: center;
}

.loading,
.error {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.5em;
}
</style>
