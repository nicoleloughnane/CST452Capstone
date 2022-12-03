import { createStore } from 'vuex';

import authModule from './modules/auth/userauthindex.js'

const store = createStore({
    modules: {
        auth: authModule
    },
});

export default store;