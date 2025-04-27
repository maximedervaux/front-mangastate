
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

      <div class="input">
            <label for="buttondisplay" class="font-bold block mb-2"> Date d'anniversaire </label>
            <DatePicker v-model="date" showIcon fluid :showOnFocus="false" inputId="date" />
      </div>

      <Button type="submit" label="Inscirption" class="btnSignIn" icon="pi pi-user-plus"/>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router'

const router = useRouter();

const date = ref(null);
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const token = ref('');

const authStore = useAuthStore();

const login = async () => {
  try {
    const authToken = await authStore.register(username.value, password.value, date.value);
    token.value = authToken;
    errorMessage.value = '';
    router.push('/dashboard');
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
  background-color: #18181b;
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
