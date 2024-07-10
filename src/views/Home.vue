<script setup>
    import MangaListHorizontal from '../components/Manga/MangaListHorizontal.vue';
</script>

<template>
    <div class="in-line">
      <h3>Tu ne trouves pas ton manga ?</h3>
      <router-link to="/add" class="add-button">+ Ajoute le</router-link>
    </div>
    <!-- Affiche MangaListHorizontal par défaut -->
    <MangaListHorizontal title="Dernières sorties 📅" ></MangaListHorizontal>
    <MangaListHorizontal title="Populaire 📈" ></MangaListHorizontal>

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
