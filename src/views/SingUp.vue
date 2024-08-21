<template>
  <div class="container">
    <form class="form" @submit.prevent="register">
      <div style="text-align: center;">
        <img class="logoAstate" src="../assets/icon-manga.webp">
        <h2>Welcome</h2>
        <p>Vous avez déjà un compte ? <router-link to="/connexion">Connectez-vous!</router-link></p>
      </div>
      <div class="input">
        <label for="username">Username</label>
        <InputText id="username" v-model="username" />
      </div>

      <div class="input">
        <label for="password">Password</label>
        <Password id="password" v-model="password" />
      </div>

      <div class="input">
        <label for="confirmPassword">Confirm Password</label>
        <Password id="confirmPassword" v-model="confirmPassword" />
      </div>

      <div class="input">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" />

      </div>

      <div class="input">
        <label for="profilePicture">Profile Picture</label>
        <InputText id="profilePicture" v-model="profilePicture" />
      </div>

      <Button type="submit" label="Register" class="btnSignUp" icon="pi pi-user-plus"/>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const profilePicture = ref('');

const errorMessage = ref('');

const authStore = useAuthStore();

const register = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match';
      return;
    }
console.log(username.value,email.value, password.value ,profilePicture.value);
    authStore.register(username.value,email.value, password.value ,profilePicture.value);
    // Handle successful registration, e.g. redirect to login page
    // this.$router.push('/signin');
  } catch (error) {
    errorMessage.value = 'Registration failed , '+error;
  }
};
</script>

<style scoped>
.btnSignUp {
  width: 95%;
  margin: 15px 0px;
  color: var(--p-overlay-modal-color);
}
.logoAstate {
  max-width: 126px;
}
.container {
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
</style>
