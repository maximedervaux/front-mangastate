<template>
    <h1>{{ title }}</h1>
    <div class="card">
        <Carousel :value="mangas" :numVisible="10" :numScroll="3">
            <template #item="slotProps">
                <MangaCard
                    v-if="slotProps.data && slotProps.data.id_manga && slotProps.data.title_manga && slotProps.data.cover_image_manga"
                    :key="slotProps.data.id_manga"
                    :title="slotProps.data.title_manga"
                    :image_link="slotProps.data.cover_image_manga"
                    :id_manga="slotProps.data.id_manga"
                />
            </template>
        </Carousel>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MangaCard from './MangaCard.vue';
import ApiService from '../../common/api.service';
import Carousel from 'primevue/carousel';

const mangas = ref([]);
const loading = ref(true);
const error = ref(null);
let page = 1;

const props = defineProps({
    title: String
});

const fetchMangas = async (page) => {
    try {
        const response = await ApiService.query('manga', { page: page, limit: 10 });
        mangas.value = response.items.filter(item => item && item.id_manga && item.title_manga && item.cover_image_manga);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchMangas(page);
});
</script>

<style scoped>
.loading,
.error {
    text-align: center;
    margin-top: 1rem;
    color: #fff;
    font-size: 1.5em;
}
</style>
