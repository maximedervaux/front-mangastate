<template>
  <div v-if="!connected">
    <Button to="/connexion" label="Connexion" icon="pi pi-user" as="router-link" class="SigninBtn" />
  </div>
  <div v-else>
    <Avatar @click="logout" :image="pp" class="mr-2" size="xlarge" shape="circle" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();
const connected = computed(() => authStore.isTokenValid());

const pp = computed(() => {
  if (connected) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.profilePicture 
      ? user.profilePicture 
      : 'https://i.pinimg.com/750x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg';
  }
});

const logout = () => {
  authStore.logout();
};
</script>
