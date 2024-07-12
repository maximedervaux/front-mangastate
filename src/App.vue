<template>
  <header>
    <Header @search="updateSearchQuery"></Header>
  </header>
  <main>
    <router-view :search-query="searchQuery"></router-view>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';

const searchQuery = ref('');

const updateSearchQuery = (query) => {
  searchQuery.value = query;
};
</script>
