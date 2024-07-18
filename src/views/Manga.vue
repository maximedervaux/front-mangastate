<template>
  <div class="container" v-if="manga">
    <img :src="manga.cover_image_manga" alt="Manga Cover">
    <div class="infos">
      <h1>{{ manga.title_manga }}</h1>
      <p v-if="manga.date_deb">Date parution : {{ formatDate(manga.date_deb) }}</p>
     
      <p v-if="manga.themes.length">
        <strong>Thèmes :</strong>
        <template v-for="theme in manga.themes">
          <Chip :label="theme.name" class="chip"/>
        </template> 
      </p>

      <p v-if="manga.genres.length">
        <strong>Genres :</strong> 
        <template v-for="genre in manga.genres">
          <Chip :label="genre.name_genre" class="chip"/>
        </template>
      </p>
      <p v-if="manga.auteurs.length">
        <strong>Auteurs : </strong>
        <template v-for="auteur in manga.auteurs">
          <Chip :label="auteur.name" class="chip"/>
        </template>
      </p>
      <div v-if="manga.description_manga">
        <strong> Description:</strong>
        <ScrollPanel style="width: 100%; height: 250px">
          {{ manga.description_manga }}
        </ScrollPanel>
      </div>
      <p v-else>Description: Information indisponible</p>
    </div>
  </div>
</template>

<script>
import api from '../common/apiManga.service';
import { onMounted, ref } from 'vue'; 
import { useRoute } from 'vue-router';

export default {
  setup() {
    const manga = ref(null);
    const route = useRoute();
  
    const fetchManga = (id_manga) => {
      api.getMangaById(id_manga)
        .then(response => {
          manga.value = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données du manga:', error);
        });
    };

    onMounted(() => {
      fetchManga(route.params.id_manga);
    });

    const formatDate = (date) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    return {
      manga,
      formatDate
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  padding: 2%;
  flex-wrap: wrap; /* Allow content to wrap on smaller screens */
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
  max-height: 500px; /* Match the image height */
}

.infos h1 {
  margin-bottom: 1rem;
}

.infos p {
  margin: 0.5rem 0;
}

.chip {
  padding: 5px 10px;
  margin: 0px 2px;
}

/* Mobile Styles */
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
    max-height: none; /* Remove max-height for mobile view */
  }

  .infos p {
    text-align: center; 
  }
}
</style>
