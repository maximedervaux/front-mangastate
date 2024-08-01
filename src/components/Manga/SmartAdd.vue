<template>
  <div class="add-component">
    <div style="display: flex;align-items: baseline;gap:1em;">
      <h1>Ajout intelligent</h1>
      <i v-tooltip="'L\'ajout intelligent trouve et ajoute automatiquement les mangas grace a son nom.'" class="pi pi-question-circle"></i>
    </div>
    <FloatLabel>
      <InputText id="mangasearch" @keyup.enter="fetchMangaQuery(search)" v-model="search" />
      <label for="mangasearch">Rechercher manga</label>
    </FloatLabel>
    <div v-if="addmessage" class="add-message">🚀 Ces mangas viennent d'être ajoutés 😎</div>
    <div v-if="loading" class="loading"><Loader></Loader></div>
    <div v-if="error" class="error">{{ error }}</div>
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MangaCard from './MangaCard.vue';
import apiMangaService from '../../common/apiManga.service';
import Loader from '../Loader.vue';

const mangas = ref([]);
const loading = ref(false);
const error = ref(null);
const search = ref('');
const addmessage = ref(null);

const fetchMangaQuery = async (query) => {
  mangas.value = [];
  loading.value = true;
  error.value = null;
  addmessage.value = null;
  try {
    const response = await apiMangaService.getNewManga(query);
    if (response.data.length > 0) {
      addmessage.value = "Ces mangas viennent d'être ajoutés 😎";
      mangas.value = response.data;
    } else {
      error.value = "Nous avons déjà ce manga ou nous le trouvons pas";
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

watch(() => search, (search) => {
  fetchMangaQuery(search);
});
</script>

<style scoped>
.tooltip {
  font-size: 1.5em;
  cursor: pointer;
  border: #fff 1px solid;
  border-radius: 50%;
}

.manga-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  overflow-y: auto;
  padding: 0px 10px;
  max-height: calc(100vh - 150px); /* Ajuster en fonction de la taille des autres éléments */
}

.add-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: solid grey 1px;
  width: 100%;
  height: 100vh; /* S'assure que le composant prend toute la hauteur de la page */
  overflow: hidden; /* Empêche le défilement de la page */
}

.loading,
.error,
.add-message {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0px;
}
</style>
