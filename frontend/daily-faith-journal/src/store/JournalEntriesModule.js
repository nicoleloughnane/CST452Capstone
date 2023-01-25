//the main vuex store imports this JournalEntriesModule as a module
//this is to help keep track of the entries a user will create, read, update and delete
//import journalentriesapi from "@/services/journalentriesapi";
import api from '../services/api';

export default {
    namespaced: true,
    state() {
        return {
            journalentries: [],
            errorOccurred: null
        }
    },
    mutations: {
        //journal entries need to be set again 
        setJournalEntries(state, entries) {
            state.journalentries = entries;
        },
        //adding a new entry to the store
        addJournalEntry(state, entry) {
            //state.journalentries = data;
            state.journalentries.push(entry);
        },
        setJournalEntry(state, entry) {
            const foundEntry = state.journalentries.findIndex(i => i.id === entry.id);
            console.log('found entry: ' + foundEntry)
            //state.journalentries.splice(foundEntry, 1, entry);
        },
        removeJournalEntry(state, entry) {
            state.journalentries.remove(entry);
        },
        updateJournalEntry(state, payload) {
            //const foundEntry = state.journalentries.findIndex(i => i.id === entry.id);
            state.journalentries.forEach(entry => {
                if(entry.id === payload.id) {
                    entry.title = payload.title;
                    entry.entryBody = payload.entryBody;
                }
            })
            //state.journalentries.splice(foundEntry, 1, entry);
        }
    },
    actions: {
        async getJournalEntries({commit}) {
            const response = await api().get('/journalentry/');
            //console.log(response.data);
            commit('setJournalEntries', response.data);
        },
        async getJournalEntryById({commit}, entryId) {
            await api().get(`/journalentry/${entryId}`) 
            .then(res => {
                commit('setJournalEntry', res.data.data);
            }).catch(error => {
                commit('errorOccurred', error.message);
            })
        },
        async createJournalEntry({commit}, entry) {
            const response = await api().post('/journalentry/', entry);
            console.log(response.data);
            commit('addJournalEntry', response.data)
        },
        async updateJournalEntry({commit}, id, entryData) {
            await api().put(`/journalentry/${id}`, entryData)
            .then(res => {
                commit('updateJournalEntry', res.data.data)
            }).catch(error => {
                commit('errorOccurred', error.message);
            })
        }, 
        async deleteJournalEntry({commit}, entryId) {
            const response = await api().delete(`/journalentry/${entryId}`);
            console.log(response.data);
            commit('deleteJournalEntry', response.data);
        }
    },
    getters: {
        //provides an indirect way to get/access the state of the journal entries
        getterJournalEntries(state) {
            return state.journalentries;
        },
        getterJournalEntryById: state => id => {
            return state.journalentries.find(entry => entry.id === id);
        },
        //if an error has occurred 
        errorOccurred(state, error) {
            state.errorOccurred = error;
          }     
    }
}
