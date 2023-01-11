//the main vuex store imports this JournalEntriesModule as a module
//this is to help keep track of the entries a user will create, read, update and delete
//import journalentriesapi from "@/services/journalentriesapi";
import api from '../services/api';

export default {
    namespaced: true,
    state() {
        return {
            journalentries: []
        }
    },
    mutations: {
        setJournalEntries(state, data) {
            state.journalentries = data;
        }
    },
    actions: {
        async getJournalEntries({commit}) {
            const response = await api().get('/journalentry/');
            console.log(response.data);
            commit('setJournalEntries', response.data);
        }
    },
    getters: {
        journalentries: state => state.journalentries
    }
}
