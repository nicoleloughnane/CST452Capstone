import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
//global components
import DefaultButton from './UI/DefaultButton.vue';
import DefaultCard from './UI/DefaultCard.vue';

const app = createApp(App);

app.use(router);

app.component('default-button', DefaultButton);
app.component('default-card', DefaultCard);

app.mount('#app');
//createApp(App).mount('#app')
