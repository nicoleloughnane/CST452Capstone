<!--This component handles the deletion of an existing journal entry-->
<template>
  <section>
    <div class="text-center">
      <h2 class="text-xl mb-5 mt-5">Delete Journal Entry</h2>
      <h3 class="text-lg mb-5 mt-5">Are you sure you want to delete?</h3>

      <div v-if="(!!entry)">
        <!--beginning of card-->
        <div class="p-6">
      <div class="block rounded-2xl shadow-xl bg-white w-full md:max-w-lg mx-auto">
        <div class="card-header">
          <!--conditionally render whatever mood the user chose-->
          <div class="flex items-center justify-start">
            <!--moods: happy, content, okay, upset, sad, or distressed-->
            <div v-if="entry.mood == 'happy'">
              <Icon icon="tabler:mood-happy" width="42" height="42" class="text-white" />
            </div>
            <div v-else-if="entry.mood == 'content'">
              <Icon icon="tabler:mood-smile" width="42" height="42" class="text-white" />
            </div>
            <div v-else-if="entry.mood == 'okay'">
              <Icon icon="uil:meh" width="42" height="42" class="text-white" />
            </div>
            <div v-else-if="entry.mood == 'upset'">
              <Icon icon="tabler:mood-sad-squint" width="42" height="42" class="text-white" />
            </div>
            <div v-else-if="entry.mood == 'sad'">
              <Icon icon="tabler:mood-sad" width="42" height="42" class="text-white" />
            </div>
            <div v-else-if="entry.mood == 'distressed'">
              <Icon icon="tabler:mood-cry" width="42" height="42" class="text-white" />
            </div>
            <!--journal entry title-->

            <h3 class="text-xl font-medium mt-4 text-white text-center grow mb-4">
              {{ entry.title }}
            </h3>
          </div>
        </div>
        <!--Entry properties-->
        <div class=" p-6" >
        <h4 hidden>{{ entry._id }}</h4>
        <h4 class="text-base">{{ entry.entryBody }}</h4>
      </div>
        <h4 class="text-sm mb-4 ml-6 italic text-left">
          {{ entry.entryDate }}
        </h4>
      </div>
      <!--end of card-->
    </div>
    </div>
    <div v-if="errorOccurred">
          <h3>An error has occurred: {{ errorOccurred }}. Please try again later!</h3>
        </div>
         <!--actions to go back or delete-->
         <div>
          <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="m-2" />
          <default-button text="Delete" buttonType="delete" class="m-2" @click="deleteEntry" />
        </div>
  </div>
  </section>
</template>

<script>
import api from "../../services/api";
import { Icon } from "@iconify/vue";
const { DateTime } = require("luxon");

export default {
  data() {
    return {
      entryId: this.$route.params._id,
      errorOccurred: null,
      entry: [],
      userID: this.$store.state.userId,
      userToken: this.$store.state.token,
    };
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  components: {
    Icon,
  },
  methods: {
    //get one entry by its ID
    async loadEntry() {
      await api()
        .get(`/journalentry/byEntryId/${this.userID}/${this.entryId}`, {
          headers: {
            Authorization: `Bearer ${this.userToken}`,
          },
        })
        .then((response) => {
          this.entry = response.data;
          //convert date to user friendly format from ISO to LocaleString
          this.entry.entryDate = DateTime.fromISO(
            this.entry.entryDate
          ).toLocaleString(DateTime.DATE_FULL);
        })
        .catch((error) => {
          this.errorOccurred = error.message;
          console.log("error has occurred: " + this.errorOccurred);
        });
    },
    //called when the user presses delete button, confirming they want to delete
    async deleteEntry() {
      await api()
        .delete(`/journalentry/delete/${this.entryId}`, {
          headers: {
            Authorization: `Bearer ${this.userToken}`,
          },
        })
        .then((response) => {
          this.entry = response.data;
          //console.log('entry response: ' + JSON.stringify(response.data));
          this.$router.push("/journalentries");
        })
        .catch((error) => {
          this.errorOccurred = error.message;
          console.log("error has occurred: " + this.errorOccurred);
        });
    },
  },
};
</script>

<style scoped>
.card-header {
  border-radius: 16px;
  background-color: #775dab;
  padding-left: 6px;
  padding-right: 6px;
}
</style>
