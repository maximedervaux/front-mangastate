<script setup>
import Header from './components/Header.vue';
import { ref } from 'vue';

const searchQuery = ref('');


</script>

<template>
  <header>
     <Header></Header>
  </header>
  <body>
    <RouterView />
  </body>
</template>

<style>

</style>
