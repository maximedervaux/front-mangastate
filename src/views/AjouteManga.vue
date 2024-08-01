<template>
  <div style="display: flex; max-height: 85vh;">
    <!-- Formulaire de recherche à gauche -->
    <SmartAdd class="smartadd" />
    <!-- Formulaire de détails du manga à droite -->
   <AddForm />
  </div>
</template>

<script setup>
import SmartAdd from '../components/Manga/SmartAdd.vue';
import AddForm from '../components/Manga/AddForm.vue';
</script>

<style scoped>
.smartadd{
width: 35%;
height: 90vh;
}

.loading,
.error {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.5em;
}
</style>
