<template>
    <section>
        <h2 class="text-xl mb-5 mt-5 text-center">Delete Journal Entry</h2>
        <h3 class="text-lg mb-5 mt-5 text-center">Are you sure you want to delete?</h3>
        <div class="flex flex-col items-center text-center">
    <div v-if="(!!entry)">
      
    <default-card class="m-4">
                <div class="m-6">
                  <h3 class="text-xl">{{ entry.title }}</h3>
                  <h4 class="text-base">{{ entry.entryBody }}</h4>
                  <h4 class="text-sm">{{ entry.entryDate }}</h4>
                </div>
                   
       <div >
        
        <default-button link :to="'/journalentries'" text="Go Back" buttonType="secondary" class="m-2"/>
        <default-button text="Delete" buttonType="delete" class="m-2" @click="deleteEntry"/>
       </div>
    </default-card>
  </div>
  <div v-else>
    <h3 class="text-center">An error has occurred</h3>
  </div>
</div>
    </section>
</template>
<script>
import api from '../../services/api';
//import journalentriesapi from '@/services/journalentriesapi';
export default {
    data() {
    return {
      entryId: this.$route.params.id,
      errorOccurred: null,
      entry: []

    }
  },
    mounted() {
      this.loadEntry();
     },
     methods: {
      //get one entry by its ID
      async loadEntry() {
        await api().get(`/journalentry/${this.entryId}`)
        .then(response => {
          this.entry = response.data;
          console.log('entry response: ' + JSON.stringify(response.data));
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });

      },
      async deleteEntry() {
        await api().delete(`/journalentry/${this.entryId}`)
        .then(response => {
          this.entry = response.data;
          console.log('entry response: ' + JSON.stringify(response.data));
          this.$router.push('/journalentries');
        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });

      }
     }
}
</script>
<style>

</style>