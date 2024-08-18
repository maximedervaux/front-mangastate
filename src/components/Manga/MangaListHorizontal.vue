<template>
    <h1>{{ title }}</h1>
    <div class="card">
        <Carousel :value="mangas" :numVisible="numVisible" :numScroll="3" :responsiveOptions="responsiveOptions">
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
    <div v-if="loading" class="loading">Loading Hor...</div>
    <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MangaCard from './MangaCard.vue';
import ApiService from '../../common/api.service';
import ApiManga from '../../common/apiManga.service';
import Carousel from 'primevue/carousel';

const mangas = ref([]);
const loading = ref(true);
const error = ref(null);
const numVisible = Math.round(screen.width/200);  
let page = 1;

const responsiveOptions = [
    {
        breakpoint: '1350px',
        numVisible: 7,
        numScroll: 5
    },
    {
        breakpoint: '1250px',
        numVisible: 6,
        numScroll: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 5,
        numScroll: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 5,
        numScroll: 5
    },
    {
        breakpoint: '768px',
        numVisible: 4,
        numScroll: 2
    },
    {
        breakpoint: '650px',
        numVisible: 3,
        numScroll: 2
    },
    {
        breakpoint: '500px',
        numVisible: 2,
        numScroll: 1
    }
];

const props = defineProps({
    title: String,
    fetch: String,
});

const fetchMangas = async (fetchParam) => {
    const fetch = String(fetchParam); 
    console.log("la chaine est :", fetch)
    try { 
        let result;
        switch(fetch) {
            case "newest":
                console.log('Fetching newest mangas');
                result = await ApiManga.getNewestManga();
                mangas.value = result.data;
                break;
            default:
                result = await ApiService.query('manga', { page: page, limit: 20 });
                mangas.value = result.items.filter(item => item && item.id_manga && item.title_manga && item.cover_image_manga);
                break;
        }
        
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    fetchMangas(props.fetch);
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
