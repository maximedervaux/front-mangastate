<template >
  <ScrollTop />
  <div>
    <div class='hero'>
      <img src="../assets/robotRGB.png" style="width: 20%;height: auto;">
      <div style="display: flex;flex-direction: column;justify-content: center;">
          <h1 style="font-size: 5em;margin: 0px; font-weight:800;">Mang<span style="color:#F8C301">Astate</span></h1>
          <p style="margin: 0px;font-size: 1.5rem;font-weight:500;">Votre bibliothèque de mangas réinventée : Simple, Intuitive, Puissante !</p>
      </div>
    </div>
    <div class="in-line">
      <h3>Tu ne trouves pas ton manga ?</h3>
      <Button as="router-link" label="Ajoute le" to="/add" text />
    </div>
   
    <!-- Affiche MangaListHorizontal par défaut -->
    <MangaListHorizontal title="Dernières sorties 📅" fetch="newest"></MangaListHorizontal>
    <MangaListHorizontal title="Populaire 📈"></MangaListHorizontal>
  </div>
</template>

<script setup>
import MangaListHorizontal from '../components/Manga/MangaListHorizontal.vue';
</script>

<style scoped>
h3 {
  font-style: italic;
  font-weight: 300;
  margin: 0px;
  align-content: center;
}
.in-line {
  display: flex;
  flex-direction: row;
  align-content: center;
}
.hero {
  display: flex;
  justify-content: center;
}
</style>
