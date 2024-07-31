<template>
  <div style="display: flex">
    <!-- Formulaire de recherche à gauche -->
    <SmartAdd class="smartadd" />
    <!-- Formulaire de détails du manga à droite -->
    <form id="manga-details-form" class="details-form">
      <h1>Ajout manuel</h1>
      <FloatLabel>
        <InputText id="title" v-model="selectedManga.title_manga" />
        <label for="title">Titre</label>
      </FloatLabel>
      <FloatLabel>
          <Textarea v-model="value" rows="5" cols="30" />
          <label>Description</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="cover_image" v-model="selectedManga.cover_image_manga" />
        <label for="cover_image">Image de couverture</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="chapter" v-model="selectedManga.chapter" type="number" />
        <label for="chapter">Nombre de chapitre</label>
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


      <ConfirmDialog id="confirm"></ConfirmDialog>
      <Button @click="confirm1()" label="Submit" ></Button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import SmartAdd from '../components/Manga/SmartAdd.vue';

const confirm = useConfirm();

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



</script>

<style scoped>
.smartadd{
width: 35%;
height: 90vh;
}
#manga-details-form{
  gap:1.3em
}
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
