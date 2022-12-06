import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
//import api from './services/api';
//global components
import DefaultButton from './UI/DefaultButton.vue';
import DefaultCard from './UI/DefaultCard.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('default-button', DefaultButton);
app.component('default-card', DefaultCard);

app.mount('#app');

