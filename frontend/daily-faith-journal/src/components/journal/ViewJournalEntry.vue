<!--displays just one journal entry-->
<template>
    <div class="flex flex-col items-center text-center">
      <h2 class="text-xl my-5 ">Journal Entry</h2>
    <div v-if="(!!entry)">
      <JournalCard :key="entry._id" :entry="entry" class="" />
    </div>
    
  <div v-else>
    <h3 class="text-center">An error has occurred</h3>
  </div>


  <!--let user go back to home page-->
    <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="mt-3" />

  </div>
</template>

<script>
import api from '../../services/api';
import JournalCard from './JournalCard.vue';
export default {
  components: {
    JournalCard
  },
  data() {
    return {
      entryId: this.$route.params._id,
      errorOccurred: null,
      entry: [],
      userID : this.$store.state.userId
    }
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  methods: {
    //called upon the form load
    async loadEntry() {
      await api().get(`/journalentry/byEntryId/${this.userID}/${this.entryId}`)
        .then(response => {
          this.entry = response.data;
          //console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });
    }
  }
}
</script>
