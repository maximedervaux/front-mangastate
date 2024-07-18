import { definePreset } from '@primevue/themes';
import chroma from 'chroma-js';
import Aura from '@primevue/themes/aura';

const baseColor = '#FFCF00';
const scales = chroma.scale([chroma(baseColor).brighten(2), baseColor, chroma(baseColor).darken(2)])
                     .colors(10);

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: scales[0],
            100: scales[1],
            200: scales[2],
            300: scales[3],
            400: scales[4],
            500: scales[5],
            600: scales[6],
            700: scales[7],
            800: scales[8],
            900: scales[9]
        }
    }
});


export default MyPreset