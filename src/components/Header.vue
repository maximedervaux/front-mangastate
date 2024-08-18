<template>
  <div class="header">
    <img src="../assets/logo.png" class="logo">
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/add">Add</router-link>
    </nav>
    <input
      type="text"
      @keyup.enter="handleSearch"
      placeholder="Rechercher un manga"
      v-model="searchQuery"
    />
    <Signin></Signin>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Signin from './Button/SignInButton.vue';

const searchQuery = ref('');
const router = useRouter();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ 
      path: '/search', 
      query: { q: searchQuery.value } 
    });
  }
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  padding: 8px;
}
nav a {
  font-weight: 300;
  text-decoration: none;
  color: white;
  padding: 8px;
}
nav a .router-link-exact-active {
  font-weight: bold;
}
nav a.router-link-active {
  font-weight: bold;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 5em;
  height: auto;
}

input {
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../assets/search-icon.png") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  color: black;
}
</style>
