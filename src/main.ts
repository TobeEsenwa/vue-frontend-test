import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import './assets/tailwind.css';
import 'vuetify/styles'

import * as components from 'vuetify/components'
import {createVuetify} from 'vuetify';

const vuetify = createVuetify({
	components,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app');

