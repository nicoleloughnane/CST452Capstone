<!--this is the main home page for the sermon notes, Read all operation is performed here to pull all entries from database-->
<!--search functionality is also stored here, for now it will direct user to new page to see search results-->
<template>
  <!--create button-->
  <div class="flex justify-end">
    <default-button text="Create Entry" buttonType="create" link :to="this.$route.path + '/create/'" class="my-3 mx-3" />
  </div>
  <div class="flex flex-col items-center text-center">
    <!--introductory section with title and search bar-->
    <section>
      <h2 class="text-xl mb-16">Sermon Notes</h2>

      <!--search for sermon note-->
      <form class="flex h-10 w-full mb-6 items-center rounded-2xl border border-solid border-brand-darkpurple"
        @submit.prevent="searchForEntry">
        <font-awesome-icon :icon="['fas', 'search']" class="mx-3" />

        <div class="flex flex-1 flex-nowrap h-full text-base font-light">
          <div class="flex h-full flex-1 relative items-center pr-3 mx-3 just">
            <label class="absolute -top-12 ml-10">Search For Sermon Note</label>
            <QueryInput placeholder="keywords" @handleQuery="updateSearchQuery" />
          </div>
        </div>

        <!--submit the form to search for an entry-->
        <default-button text="Search" buttonType="search" class="rounded-r-2xl" link
          :to="this.$route.path + '/' + userSearchQuery" />

      </form>

    </section>
    <!--loop through first 10 entries that are pulled from axios displayedEntries request in scripts-->
    <!--display all entries in a sermon note card component with options to view further, edit it, or delete it-->
    <section>
      <div class="entries">
        <div v-if="(entries.length > 0)">

          <sermon-note-card v-for="entry in displayedEntries" :key="entry.id" :entry="entry" class="m-4" />

        </div>

        <!--if an error has occurred: network-->
        <div v-if="errorOccurred === 'Network Error'">
          <h3>There is an error on our end. Please try again later! </h3>
        </div>
        <!--else if no entries exist-->
        <div v-else-if="(entries.length === 0)">
          <h3>No sermon notes were found. How about creating one? </h3>
        </div>
      </div>
    </section>

    <!--page numbers-->
    <section>
      <div class="mx-auto my-8">
        <div class="flex flex-row flex-nowrap">
          <p class="flex-grow text-sm"> Page {{ currentPage }}</p>
        </div>
      </div>
      <!--previous page-->
      <div class="flex items-center justify-center">
        <router-link v-if="previousPage" :to="{ query: { page: previousPage } }"
          class="mx-3 my-3 text-sm underline text-brand-darkpurple">
          Previous
        </router-link>
      </div>
      <!--next page-->
      <router-link v-if="nextPage" :to="{ query: { page: nextPage } }"
        class="mx-3 my-3 text-sm underline text-brand-darkpurple">
        Next
      </router-link>
    </section>
  </div>
</template>
 
<script>

import api from '../../services/api';
import QueryInput from '../UI/QueryInput.vue';
import SermonNoteCard from './SermonNoteCard.vue';

export default {
  components: {
    QueryInput,
    SermonNoteCard,
   

  },
  data() {
    return {
      entries: [],
      errorOccurred: null,
      userSearchQuery: ""
    }
  },
  computed: {
    //the methods for currentPage, previousPage, and nextPage were written with the assistance of Vue Masterclass on Udemy
    //section 19: 237, 240-243

    //returns the current page or 1
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1")
    },
    //returns the result of calculation - what the previous page number is if it exists
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      const result = previousPage >= firstPage ? previousPage : undefined;
      //console.log('result in previousPage: ' + result)
      return result;
    },
    //returns the result of the calculation - what the next page number is if it exists
    nextPage() {
      //ex: 1 + 1 = 2
      const nextPage = this.currentPage + 1;
      //ex: 11/10 = 2
      const lastPage = Math.ceil(this.entries.length / 10);
      //ex: 2 <= 2 
      const result = nextPage <= lastPage ? nextPage : undefined;
      //console.log('result in nextPage: ' + result)
      return result;
    },

    //only display the first 10 entries
    displayedEntries() {
      const pageNum = this.currentPage;
      //get batch of 10 entries based on existing page number
      const firstEntryIndex = (pageNum - 1) * 10;
      const lastEntryIndex = pageNum * 10;
      return this.entries.slice(firstEntryIndex, lastEntryIndex);
    },

  },
  //when component is loaded, call loadEntries
  mounted() {
    this.loadEntries();
  },
  //load journal entries from api
  methods: {
    async loadEntries() {
      await api().get(`/sermonnote/`)
        .then(response => {
          this.entries = response.data;
          //console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        })
      return api().get('/sermonnote/');
    },
    //whenever search query is updated within the text input field, this updates the users search query
    updateSearchQuery(payload) {
      this.userSearchQuery = payload;
      //console.log(payload)
    }
  }
}
</script>