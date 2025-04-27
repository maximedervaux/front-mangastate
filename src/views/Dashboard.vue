<template>
    <div class="card">
        <div style="display: flex; flex-direction: row;align-items: start;">
        <Avatar :image="authStore.user.profilePicture || '/default-avatar.png'" class="mr-2" size="xlarge" shape="circle" />
        <div class="user-info" style="margin-left: 20px;">
            <h1 style="margin: 0%;">Bonjour {{ authStore.user.username }}!</h1>
            <div class="stats">
                <div class="stat-item">
                    <h4>Lu</h4>
                    <p>{{ stats.read }}</p>
                </div>
                <div class="stat-item">
                    <h4>En cours</h4>
                    <p>{{ stats.inProgress }}</p>
                </div>
                <div class="stat-item">
                    <h4>Total</h4>
                    <p>{{ stats.total }}</p>
                </div>  

            </div>     
        </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '../stores/authStore';
  import Card from 'primevue/card';
  import Avatar from 'primevue/avatar';
  
  const authStore = useAuthStore();
  const stats = ref({ read: 0, inProgress: 0, total: 0 });
  
  onMounted(() => {
    if (authStore.user && typeof authStore.user === 'string') {
      authStore.user = JSON.parse(authStore.user);
    }
  
    stats.value = {
      read: 24,
      inProgress: 5,
      total: 50,
    };
  });
  </script>
  
  <style scoped>
  h2 {
    font-size: 2rem;
    text-align: center;
  }

  .card {
    width: 100%;
    margin: 20px 0;
    padding: 20px;
    background-color:var(--p-drawer-background);
    color: #fff;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }

  .stats {
    display: flex;
    justify-content: space-around;
  }
  </style>
  