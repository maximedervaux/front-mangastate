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

      <Button type="submit" label="Submit" class="mt-2" />
      
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
    console.log(authToken)
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
.logoAstate{
  max-width: 126px;
}
.container{
 display: flex;
 align-items: center;
 justify-content:center ;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}
.input {
  display: flex;
  flex-direction: column;
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
