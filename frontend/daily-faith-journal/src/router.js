import {createRouter, createWebHistory} from 'vue-router'
import NotFound from './components/pages/NotFound.vue';
import UserAuth from './components/pages/LoginUserComponent.vue';
import WelcomeHome from './components/pages/WelcomeHome.vue';
import SignUpUser from './components/pages/SignUpUserComponent.vue';
//journal entries
import JournalEntryHome from './components/journal/JournalEntryHome.vue';
import CreateJournalEntry from './components/journal/CreateJournalEntry.vue';
import ViewJournalEntry from './components/journal/ViewJournalEntry.vue';
import EditJournalEntry from './components/journal/EditJournalEntry.vue';
import DeleteJournalEntry from './components/journal/DeleteJournalEntry.vue';
//sermon notes
import SermonNoteHome from './components/sermonnote/SermonNoteHome.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: WelcomeHome},
        {path: '/', redirect: '/login'},
        {path: '/login', component: UserAuth},
        {path: '/signup', component: SignUpUser},
        {path: '/journalentries', component: JournalEntryHome},
        {path: '/journalentries/create/:id', component: CreateJournalEntry},
        {path: '/journalentries/view/:id', component: ViewJournalEntry},
        {path: '/journalentries/edit/:id', component: EditJournalEntry},
        {path: '/journalentries/delete/:id', component: DeleteJournalEntry},
        {path: '/sermonnotes', component: SermonNoteHome},
        //invalid route
        {path: '/:notFound(.*)', component: NotFound},
    ],
});



export default router;