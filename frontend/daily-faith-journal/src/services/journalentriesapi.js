import api from './api';
export default {
    getJournalEntries() {
        return api().get('/journalentry/');
    },
    getJournalEntryById(id) {
        return api().get(`/journalentry/${id}`);
    },
    createJournalEntry(data) {
        return api().post('/journalentry/', data);
    },
    updateJournalEntry(id, params) {
        return api().put(`/journalentry/${id}`, params);
    },
    deleteJournalEntry(id) {
        return api().delete(`/journalentry/${id}`);
    }
} 