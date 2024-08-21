<template>
  <div class="container">
    <form class="form" @submit.prevent="login">
      <div style="text-align: center;">
        <img class="logoAstate" src='../assets/icon-manga.webp'>
        <h2>Welcome Back</h2>
        <p>Vous n'avez pas encore de compte ? <router-link to="/inscription">Créez le maintenant!</router-link></p>
      </div>
      <div class="input">
        <label for="username">Username</label>
        <InputText id="username" v-model="username" />
      </div>

      <div class="input">
        <label for="password">Password</label>
        <InputText id="password" v-model="password" type="password" />
      </div>

      <div class="forgot-password">
        <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
      </div>

      <Button type="submit" label="Connexion" class="btnSignIn" icon="pi pi-user"/>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';


const username = ref('');
const password = ref('');
const errorMessage = ref('');


const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login(username.value, password.value);
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
  color: var(--p-overlay-modal-color);
}
.logoAstate{
  max-width: 126px;
}
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border-radius: var(--p-content-border-radius);
  background-color: var(--p-overlay-modal-background); 
  box-shadow: var(--shadow-2); 
  color: var(--p-overlay-modal-color);
}
.input {
  display: flex;
  flex-direction: column;
  width: 95%;
}
.error {
  color: var(--red-500); 
  margin-top: 10px;
}
.token {
  color: var(--green-500); 
  margin-top: 10px;
  word-break: break-all;
}

.forgot-password{
  text-align: right;
  width: 90%;
}
</style>
