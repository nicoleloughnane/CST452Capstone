import api from './api';
export default {
    errorOccurred: null,

    //get all journal entries
    async getJournalEntries() {
        await api().get(`/journalentry/`) 
            .then(response => {
                return response.data
            }).catch(error => {
                this.errorOccurred = error.message;
            })
        return api().get('/journalentry/'); 
    },

    //get a journal entry by its ID
    async getJournalEntryById(id) {
        await api().get(`/journalentry/${id}`)
        .then(response => {
            return response.data;
        }).catch(error => {
            this.errorOccurred = error.message;
        })
    },

    //create a journal entry
    async createJournalEntry(data) {
        await api().post('/journalentry/', data)
        .then(response => {
            return response.data;
        }).catch(error => {
            this.errorOccurred = error.message;
        })
    },

    //update an existing journal entry
    async updateJournalEntry(id, params) {
        await api().put(`/journalentry/${id}`, params)
        .then(response => {
            return response.data;
        }).catch(error => {
            this.errorOccurred = error.message;
        })
    },
    //delete a journal entry
    async deleteJournalEntry(id) {
        await api().delete(`/journalentry/${id}`)
        .then(response => {
            return response.data;
        }).catch(error => {
            this.errorOccurred = error.message;
        })
    }
} 