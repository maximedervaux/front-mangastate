<template>
  <div class="card">
      <div class="flex gap-2 justify-center">
          <Button icon="pi pi-bars" @click="visibleRight = true" />
      </div>
    
      <Drawer v-model:visible="visibleRight" header="MangAstate" position="right">
        <template #footer>
            <div style="display: flex;justify-content: center;"  v-if="!connected">
              <Button to="/connexion" label="Connexion" icon="pi pi-user" as="router-link" class="SigninBtn" @click="visibleRight=false"/>
            </div>
            <div class="footer" v-else>
              <div class="userPersonalInfo">
                <Avatar :image="user.profilePicture" class="mr-2" size="xlarge" shape="circle" />
                <p>{{user.username }}</p>
              </div>           
              <Button icon="pi pi-sign-out" severity="danger" text raised rounded aria-label="Cancel" @click="logout"/>
          </div>
        </template>
      </Drawer>


  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from 'vue';
import { useAuthStore } from '../../stores/authStore';


const visibleRight = ref(false);
const authStore = useAuthStore();
const connected = computed(() => authStore.isTokenValid());

const user = computed(() => {
  if (connected) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user
  }
});

const logout = () => {
  authStore.logout();
};

</script>


<style scoped>
.footer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bottom{
  position: absolute;
  bottom: 0px;
  border-top: 1px solid grey;
  width: 100%;
}

.userPersonalInfo{
  display: flex;
  flex-direction: row;
  gap: 8px
}

</style>