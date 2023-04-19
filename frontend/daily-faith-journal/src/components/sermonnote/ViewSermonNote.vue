<!--displays just one sermon note-->
<template>
  <div class="flex flex-col items-center text-center ">
    <h2 class="text-xl my-5">Sermon Note</h2>
    <div class="p-6">
      <div class="md:max-w-lg mx-auto">
        <div v-if="entry">
          <SermonNoteCard :key="entry._id" :entry="entry" />
        </div>
        <div v-else>
          <h3>An error has occurred</h3>
        </div>
      </div>
    </div>

    <!--let user go back to home page-->

    <default-button link :to="'/sermonnotes'" text="Go Back" buttonType="secondary" class="mt-3" />

  </div>
</template>
  
<script>
import api from '../../services/api';
import SermonNoteCard from './SermonNoteCard.vue';
const { DateTime } = require("luxon");
export default {
  components: {
    SermonNoteCard
  },
  data() {
    return {
      entryId: this.$route.params.id,
      errorOccurred: null,
      entry: null,
      userID: this.$store.state.userId,
      userToken: this.$store.state.token
    }
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  methods: {
    //called upon the form load
    async loadEntry() {
      await api().get(`/sermonnote/byEntryId/${this.userID}/${this.entryId}`, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then(response => {
          this.entry = response.data;
          this.entry.entryDate = DateTime.fromISO(
            this.entry.entryDate
          ).toLocaleString(DateTime.DATE_FULL);
          this.entry.verses = this.entry.verses.join(', ')
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });
    }
  }
}
</script>
  