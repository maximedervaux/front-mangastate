<script setup>
import MangaListHorizontal from './components/Manga/MangaListHorizontal.vue';
import MangaList from './components/Manga/MangaList.vue';
import Header from './components/Header.vue';
import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = async (term) => {
  searchQuery.value = term.trim();
};

</script>

<template>
  <header>
     <Header @search="handleSearch"></Header>
  </header>
  <body>
    <div class="in-line">
      <h3>Tu ne trouves pas ton manga ?</h3>
      <a class="add-button"src="">+ Ajoute le</a>
    </div>
    <!-- Affiche MangaListHorizontal par défaut -->
    <MangaListHorizontal title="Dernières sorties 📅" v-if="!searchQuery"></MangaListHorizontal>
    <MangaListHorizontal title="Populaire 📈" v-if="!searchQuery"></MangaListHorizontal>
    <!-- Affiche MangaList lorsque la recherche est active -->
    <MangaList v-else :searchQuery="searchQuery"></MangaList>
  </body>
</template>

<style scoped>
  h3{
    font-style: italic;
    font-weight: 300;
    margin : 0px;
    align-content: center;
  }
  .in-line{
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  .add-button{
    border : solid 1px yellow;
    text-align: center;
    margin: 5px;
    padding: 1px 4px;
    border-radius: 10px;
    font-weight: 200;
  }
</style>
