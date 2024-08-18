<template>
  <header>
    <Header></Header>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import Header from './components/Header.vue';
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
authStore.loadToken();


</script>
