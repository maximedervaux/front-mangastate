<template>
  <div style="display: flex; height: 100vh;">
    <!-- Formulaire de recherche à gauche -->
    <form id="smartadd" @submit.prevent="search" class="search-form">
      <FloatLabel>
        <InputText id="mangasearch" v-model="searchValue" />
        <label for="mangasearch">Rechercher manga</label>
      </FloatLabel>
      <div class="list">
        <SmartMangaList :search-query="searchQuery" @select-manga="selectManga" />
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </form>
    <!-- Formulaire de détails du manga à droite -->
    <form id="manga-details-form" class="details-form">
      <FloatLabel>
        <InputText id="title" v-model="selectedManga.title_manga" />
        <label for="title">Titre</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="description" v-model="selectedManga.description_manga" />
        <label for="description">Description</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="cover_image" v-model="selectedManga.cover_image_manga" />
        <label for="cover_image">Image de couverture</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="chapter" v-model="selectedManga.chapter" type="number" />
        <label for="chapter">Chapitre</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="status" v-model="selectedManga.status" />
        <label for="status">Statut</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="date_deb" v-model="selectedManga.date_deb" type="date" />
        <label for="date_deb">Date de début</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="date_fin" v-model="selectedManga.date_fin" type="date" />
        <label for="date_fin">Date de fin</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="prix" v-model="selectedManga.prix" type="number" />
        <label for="prix">Prix</label>
      </FloatLabel>
      <Button label="Submit" />
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import SmartMangaList from '../components/Manga/SmartMangaList.vue';

const searchValue = ref('');
const searchQuery = ref('');
const selectedManga = ref({
  title_manga: '',
  description_manga: '',
  cover_image_manga: '',
  chapter: '',
  status: '',
  date_deb: '',
  date_fin: '',
  prix: ''
});
const loading = ref(false);
const error = ref(null);

const search = () => {
  searchQuery.value = searchValue.value;
};

const selectManga = (manga) => {
  selectedManga.value = manga;
};

// Watch the selectedManga to log its value whenever it changes
watch(selectedManga, (newManga) => {
  console.log('Manga sélectionné:', newManga);
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.details-form {
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.list {
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
