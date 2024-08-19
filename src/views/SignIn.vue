<template>
  <div class="container">
    <form class="form" @submit.prevent="login">
      <img class="logoAstate" src='../assets/icon-manga.webp'>
      <div class="input">
        <label for="username">Username</label>
        <InputText id="username" v-model="username" />
      </div>

      <div class="input">
        <label for="password">Password</label>
        <InputText id="password" v-model="password" type="password" />
      </div>

      <Button type="submit" label="Connexion" class="btnSignIn" icon="pi pi-user"/>
      
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="token" class="token">Token: {{ token }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const token = ref('');

const authStore = useAuthStore();

const login = async () => {
  try {
    const authToken = await authStore.login(username.value, password.value);
    token.value = authToken;
    errorMessage.value = '';
    // Rediriger l'utilisateur après une connexion réussie, par exemple :
    // this.$router.push('/dashboard');
  } catch (error) {
    errorMessage.value = 'Invalid username or password';
  }
};
</script>

<style scoped>
.btnSignIn{
  width: 95%;
  margin:15px 0px ;
}
.logoAstate{
  max-width: 126px;
}
.container{
 display: flex;
 align-items: center;
 justify-content:center ;
 height: 80vh;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border-radius: 2%;
  background-color: #1E2023;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}
.input {
  display: flex;
  flex-direction: column;
  width: 95%;
}
.passwd {
  width: 100%;
}
.inputStyle {
  width: 100%;
}
.error {
  color: red;
  margin-top: 10px;
}
.token {
  color: green;
  margin-top: 10px;
  word-break: break-all;
}
</style>
