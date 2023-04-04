import {createRouter, createWebHistory} from 'vue-router'
import store from './store/UserStore';

//pages
import NotFound from './components/pages/NotFound.vue';
import UserAuth from './components/pages/LoginUserComponent.vue';
import WelcomeHome from './components/pages/WelcomeHome.vue';
import SignUpUser from './components/pages/SignUpUserComponent.vue';
import HelpCenter from './components/pages/HelpCenter.vue';
//journal entries
import JournalEntryHome from './components/journal/JournalEntryHome.vue';
import JournalEntryResults from './components/journal/JournalEntryResults.vue';
import CreateJournalEntry from './components/journal/CreateJournalEntry.vue';
import ViewJournalEntry from './components/journal/ViewJournalEntry.vue';
import EditJournalEntry from './components/journal/EditJournalEntry.vue';
import DeleteJournalEntry from './components/journal/DeleteJournalEntry.vue';
//sermon notes
import SermonNoteHome from './components/sermonnote/SermonNoteHome.vue';
import SermonNoteResults from './components/sermonnote/SermonNoteResults.vue';
import CreateSermonNote from './components/sermonnote/CreateSermonNote.vue';
import DeleteSermonNote from './components/sermonnote/DeleteSermonNote.vue';
import EditSermonNote from './components/sermonnote/EditSermonNote.vue';
import ViewSermonNote from './components/sermonnote/ViewSermonNote.vue';

const router = createRouter({
    history: createWebHistory(),
    //scroll to the top and left of the screen, smooth scroll
    scrollBehavior() {
        return { top: 0, left: 0, behavior: "smooth"}
    },
    routes: [
        //pages
        {path: '/home', component: WelcomeHome},
        {path: '/', redirect: '/login'},
        {path: '/login', component: UserAuth, meta: {requiresAuth: false}},
        {path: '/signup', component: SignUpUser, meta: {requiresAuth: false}},
        {path: '/help', component: HelpCenter, meta: {requiresAuth: true}},
        //invalid route
        {path: '/:notFound(.*)', component: NotFound},
        //journal entries
        {path: '/journalentries', component: JournalEntryHome, meta: {requiresAuth: true}},
        {path: '/journalentries/:userSearchQuery', component: JournalEntryResults, name: 'JournalEntryResults'},
        {path: '/journalentries/create', component: CreateJournalEntry},
        {path: '/journalentries/view/:_id', component: ViewJournalEntry},
        {path: '/journalentries/edit/:_id', component: EditJournalEntry},
        {path: '/journalentries/delete/:_id', component: DeleteJournalEntry},
        //sermon notes
        {path: '/sermonnotes', component: SermonNoteHome},
        {path: '/sermonnotes/:userSearchQuery', component: SermonNoteResults, name: 'SermonNoteResults'},
        {path: '/sermonnotes/create', component: CreateSermonNote},
        {path: '/sermonnotes/view/:id', component: ViewSermonNote},
        {path: '/sermonnotes/edit/:id', component: EditSermonNote},
        {path: '/sermonnotes/delete/:id', component: DeleteSermonNote},
        
    ],
});

//global navigation guard
router.beforeEach(function(to, from, next) {
    //if this page requires authentication and user is not logged in
    if(to.meta.requiresAuth && !store.state.isLoggedIn) {
        //send to login page
        next('/login');
    } else {
        next();
    }
})

export default router;