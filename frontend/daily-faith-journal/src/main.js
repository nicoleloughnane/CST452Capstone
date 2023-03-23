import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store/UserStore";
//global components
import DefaultButton from "./components/UI/DefaultButton.vue";
import DefaultCard from "./components/UI/DefaultCard.vue";


const app = createApp(App);

app.use(router);
app.use(store);

app.component("default-button", DefaultButton);
app.component("default-card", DefaultCard);


app.mount("#app");
