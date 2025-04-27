<template>
  <div class="card">
      <div class="flex gap-2 justify-center">
          <Button icon="pi pi-bars" @click="visibleRight = true" />
      </div>
    
      <Drawer v-model:visible="visibleRight" header="MangAstate" position="right">

        <div class="flex justify-center" style="width: 100%">
          <Menu :model="items" style="border: none;width: 100%;">
              <template #item="{ item, props }">
                  <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                      <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                          <span :class="item.icon" />
                          <span class="ml-2">{{ item.label }}</span>
                      </a>
                  </router-link>
                  <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                      <span :class="item.icon" />
                      <span class="ml-2">{{ item.label }}</span>
                  </a>
              </template>
          </Menu>
        </div>

        <template #footer>
            <div style="display: flex;justify-content: center; gap: 4px"  v-if="!connected">
              <Button to="/connexion" label="Connexion" icon="pi pi-sign-in" as="router-link" class="SigninBtn" @click="visibleRight=false"/>
              <Button to="/inscription" label="Inscription" icon="pi pi-user-plus" as="router-link" class="SigninBtn" @click="visibleRight=false"/>
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

const items = ref([
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        route: '/dashboard'
    },
    {
        label: 'Mangathèque',
        icon: 'pi pi-bookmark',
        route:'/'
    },
    {
        label: 'Calendrier',
        icon: 'pi pi-calendar',
        route:'/'
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        route:'/'
    }
]);

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

.content{
  overflow-y: auto;
}

</style>