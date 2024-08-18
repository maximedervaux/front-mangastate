<template>
    <div v-if="!connected">
      <Button to="/signin" label="SignIn" icon="pi pi-user" as="router-link" />
    </div>
    <div v-else>
      <Avatar @click="logout" image="https://i.redd.it/u595cks8nqhx.jpg" class="mr-2" size="xlarge" shape="circle" />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAuthStore } from '../../stores/authStore';
  
  const authStore = useAuthStore();
  
  // Computed property to dynamically react to the token state
  const connected = computed(() => authStore.isTokenValid());
  
  const logout = () => {
    authStore.logout();
  };
  </script>
  
  <style scoped>
 
  </style>
  