<template>
  <div class="container" v-if="manga">
    <img :src="manga.cover_image_manga" alt="Manga Cover">
    <div class="infos">
      <h1>{{ manga.title_manga }}</h1>

      <!-- Affiche le bouton si l'utilisateur est connecté et n'a pas déjà ajouté ce manga -->
      <Button 
        v-if="authStore.isTokenValid() && !liked" 
        label="Ajouter à ma liste" 
        icon="pi pi-plus" 
        class="p-button-success mb-4" 
        @click="addToList" 
      />

      <Button 
        v-if="liked" 
        label="Ajouté" 
        icon="pi pi-check" 
        class="p-button-success mb-4" 
        @click="addToList" 
      />

      <p v-if="manga.date_deb"><strong>Date parution :</strong> {{ formatDate(manga.date_deb) }}</p>

      <!-- Thèmes, Genres, Auteurs, Description comme avant -->
      <div v-if="manga.themes.length" class="chiplist">
        <strong>Thèmes :</strong>
        <template v-for="theme in manga.themes">
          <Chip :label="theme.name" class="chip" />
        </template> 
      </div>

      <div v-if="manga.genres.length" class="chiplist">
        <strong>Genres :</strong> 
        <template v-for="genre in manga.genres">
          <Chip :label="genre.name_genre" class="chip" />
        </template>
      </div>

      <div v-if="manga.auteurs.length" class="chiplist">
        <strong>Auteurs :</strong>
        <template v-for="auteur in manga.auteurs">
          <Chip :label="auteur.name" class="chip" />
        </template>
      </div>

      <div v-if="manga.description_manga" class="chiplist">
        <strong>Description :</strong>
        <ScrollPanel style="width: 100%; height: 250px">
          {{ manga.description_manga }}
        </ScrollPanel>
      </div>
      <p v-else>Description : Information indisponible</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'; 
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import Button from 'primevue/button';
import Chip from 'primevue/chip';
import ScrollPanel from 'primevue/scrollpanel';
import api from '../common/apiManga.service';

const manga = ref(null);
const liked = ref(false); 

const route = useRoute();
const authStore = useAuthStore();

const checkIfMangaIsLiked = async () => {
  if (authStore.isTokenValid()) {
    try {
      console.log('User ID:', authStore.user.id_user);
      const response = await api.getUserMangas(authStore.user.id_user); 
      console.log('Mangas:', response.data); // Assure-toi que la réponse contient bien un tableau dans `data`
      
      liked.value = response.data.some(m => m.id_manga === manga.value.id_manga); 
    } catch (error) {
      console.error('Erreur lors de la récupération des mangas de l\'utilisateur :', error);
    }
  }
};


const fetchManga = async (id_manga) => {
  try {
    const response = await api.getMangaById(id_manga);
    manga.value = response.data;
    checkIfMangaIsLiked(); 
  } catch (error) {
    console.error('Erreur lors de la récupération des données du manga:', error);
  }
};

const addToList = async () => {
  try {
    await api.addToWishlist(manga.value.id_manga); 
    liked.value = true; 
  } catch (error) {
    console.error('Erreur en ajoutant le manga :', error);
  }
};

onMounted(() => {
  fetchManga(route.params.id_manga); // Charge le manga dès que le composant est monté
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.container {
  display: flex;
  padding: 2%;
  flex-wrap: wrap; 
}

img {
  border-radius: 4px;
  width: auto;
  height: 500px; 
  object-fit: cover; 
  margin-right: 2%; 
}

.infos {
  flex: 1;
  margin-top: 1rem;
  max-height: 500px;
}

.infos h1 {
  margin-bottom: 1rem;
}

.infos p {
  margin: 0.5rem 0;
}

.chip {
  padding: 5px 10px;
}

.chiplist {
  display: flex;
  flex-wrap: wrap;
  gap: 4px; 
  align-items: center;
  margin:8px 0px ;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column; 
    align-items: center; 
  }

  img {
    width: 80%; 
    height: auto; 
    margin-right: 0; 
    margin-bottom: 1rem;
  }

  .infos {
    width: 100%; 
    margin: 0; 
    max-height: none; 
  }

  .infos p {
    text-align: center; 
  }
}
</style>
