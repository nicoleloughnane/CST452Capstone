<template>
  <!--create entry button-->
  <div class="flex justify-end">
      <default-button text="Create Entry" buttonType="create" link :to="this.$route.path + '/create/'" class="my-3 mx-3" />
    </div>
  <div class="flex flex-col items-center text-center">
  <!--introductory section for information and button to make new entry-->
    <section>
    <h2 class="text-xl mb-16">Journal Entries</h2>

      <!--search for a journal entry-->
      <my-search-bar/>

   </section>
<!--loop through first 10 entries that are pulled from axios loadEntries request in scripts-->
    <section>
      <div class="entries">
        <div v-if="(entries.length > 0)">
          <ul>
            <li v-for="entry in displayedEntries" :key="entry.id">

              <default-card class="m-4">
                <div class="m-6">
                  <h3 class="text-xl">{{ entry.title }}</h3>
                  <h4 class="text-base">{{ entry.entryBody }}</h4>
                  <h4 class="text-sm">{{ entry.entryDate }}</h4>
                </div>
                <!--actions the user can take: view, edit, or delete-->
                <div class="actions">
                  <default-button link :to="this.$route.path + '/view/' + entry.id" text="View" buttonType="primary" class="m-2" />
                  <default-button link :to="this.$route.path + '/edit/' + entry.id" text="Edit" class="m-2" />
                  <default-button link :to="this.$route.path + '/delete/' + entry.id" text="Delete" buttonType="delete" class="m-2" />
                </div>

              </default-card>
            </li>

          </ul>

        </div>
        <div v-else>
          <h3>There are either no journal entries or our servers are down. Please try again later! </h3>
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
        <router-link v-if="previousPage"
        :to="{ query: {page: previousPage} }"
        class="mx-3 my-3 text-sm underline text-brand-darkpurple">
        Previous
        </router-link>
      </div>
      <!--next page-->
      <router-link v-if="nextPage"
        :to="{query: {page: nextPage} }"
        class="mx-3 my-3 text-sm underline text-brand-darkpurple">
        Next
        </router-link>
    </section>
  </div>

</template>
 
<script>
import api from '../../services/api';
import MySearchBar from '../UI/MySearchBar.vue';
export default {
  components: {
    MySearchBar,
  },
  data() {
    return {
      entries: [],
      errorOccurred: null,

    }
  },
  computed: {
    //the following methods were written with the assistance of Vue Masterclass on Udemy: section 19: 237, 240-243
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1")
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      const result  = previousPage >= firstPage ? previousPage: undefined;
      //console.log('result in previousPage: ' + result)
      return result;
    },
    nextPage() {
      //ex: 1 + 1 = 2
      const nextPage = this.currentPage + 1;
      //ex: 11/10 = 2
      const lastPage = Math.ceil(this.entries.length / 10);
      //ex: 2 <= 2 
      const result = nextPage <= lastPage ? nextPage: undefined;
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
      await api().get(`/journalentry/`)
        .then(response => {
          this.entries = response.data;
          //this.entries = JSON.stringify(response.data);
          console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        })
      return api().get('/journalentry/');
    }
  }
}
</script>

<style>
</style>