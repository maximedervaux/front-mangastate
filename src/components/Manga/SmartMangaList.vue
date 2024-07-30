<template>
  <div v-if="!loading&&!error">🚀 Ces mangas viennent d'etre ajoutés 😎</div>
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
const loading = ref(false);
const error = ref(null);

const fetchMangaQuery = async (query) => {
  mangas.value= []
  loading.value = true;
  error.value = null;
    try {
      const response = await apiMangaService.getNewManga(query);
      if (response.data.length> 0) {
      mangas.value = response.data;
    }else{
      error.value="Nous avons déja ce manga ou nous le trouvons pas"
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};


watch(() => props.searchQuery, (newQuery) => {
  if (newQuery) {
    fetchMangaQuery(newQuery);
  }
});

</script>

<style scoped>
.manga-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 16px;
  justify-content: center;
  max-height: 60vh ;
  overflow-y:auto;
}

.loading,
.error {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.5em;
}
</style>
