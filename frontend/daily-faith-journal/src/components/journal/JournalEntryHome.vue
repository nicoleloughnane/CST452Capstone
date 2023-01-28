<template>
  <div class="flex flex-col items-center">
    <h2 class="text-xl mb-5 mt-5">Journal Entries</h2>
    <h4 class="text-lg mb-5">What is God doing in your life today?</h4>
    <default-button text="Create Entry" buttonType="create" link :to="createEntryLink" class="mb-3" />

    <section>
      <div class="entries">
        <div v-if="(entries.length > 0)">
          <ul>
            <li v-for="entry in entries" :key="entry.id">

              <default-card class="m-4">
                <div class="m-6">
                  <h3 class="text-xl">{{ entry.title }}</h3>
                  <h4 class="text-base">{{ entry.entryBody }}</h4>
                  <h4 class="text-sm">{{ entry.entryDate }}</h4>
                </div>
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
          <h3>There are either no journal entries or our servers are down.</h3>
        </div>
      </div>
    </section>
  </div>

</template>
 
<script>
import api from '../../services/api';
export default {

  computed: {
    entryDetailsLink(id) {
      return () => {
        console.log('received id', id)
        //uses the current path and adds id of specific post to the route
        return this.$route.path + '/view/' + this.id
      }
    },
    editEntryLink() {
      //uses the current path and adds id of specific post to the route
      return this.$route.path + '/edit/' + this.id
    },
    deleteEntryLink() {
      //uses the current path and adds id of specific post to the route
      return this.$route.path + '/delete/' + this.id
    },
    createEntryLink() {
      return this.$route.path + '/create'
    }
  },
  components: {
    //JournalEntryComponent
  },

  data() {
    return {
      entries: [],
      errorOccurred: null,

    }
  },
  mounted() {
    this.loadEntries();
  },
  methods: {
    async loadEntries() {
      await api().get(`/journalentry/`)
        .then(response => {
          this.entries = response.data;
          //this.entries = JSON.stringify(response.data);
          console.log('entry response: ' + this.entries);
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