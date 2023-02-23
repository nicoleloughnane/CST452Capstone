import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store/UserStore";
//global components
import DefaultButton from "./components/UI/DefaultButton.vue";
import DefaultCard from "./components/UI/DefaultCard.vue";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("default-button", DefaultButton);
app.component("default-card", DefaultCard);

//add icons to library
library.add(faSearch, faPencilSquare, faTrash);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
