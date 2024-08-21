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
        <div style="display: flex; justify-content: center;" v-if="!connected">
          <Button to="/connexion" label="Connexion" icon="pi pi-user" as="router-link" class="SigninBtn" @click="visibleRight = false"/>
        </div>
        <div class="footer" v-else>
          <div class="userPersonalInfo">
            <Avatar v-if="authStore.user" :image="authStore.user.profilePicture" class="mr-2" size="xlarge" shape="circle" />
            <p v-if="authStore.user">{{ authStore.user.username }}</p>
          </div>
          <Button icon="pi pi-sign-out" severity="danger" text raised rounded aria-label="Cancel" @click="logout" />
        </div>
      </template>
    </Drawer>
  </div>
</template>


<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from '../../stores/authStore';

const visibleRight = ref(false);
const authStore = useAuthStore();
const connected = computed(() => authStore.isTokenValid());

watch(connected, (newVal) => {
  console.log('connected', newVal);
  if (!newVal) {
    authStore.logout();
  }
});

const logout = () => {
  authStore.logout();
  visibleRight.value = false; 
};

const items = ref([
  { label: 'Dashboard', icon: 'pi pi-home', route: '/' },
  { label: 'Mangathèque', icon: 'pi pi-bookmark', route: '/' },
  { label: 'Calendrier', icon: 'pi pi-calendar', route: '/' },
  { label: 'Settings', icon: 'pi pi-cog', route: '/' }
]);
</script>


<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bottom {
  position: absolute;
  bottom: 0px;
  border-top: 1px solid grey;
  width: 100%;
}

.userPersonalInfo {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.content {
  overflow-y: auto;
}
</style>
