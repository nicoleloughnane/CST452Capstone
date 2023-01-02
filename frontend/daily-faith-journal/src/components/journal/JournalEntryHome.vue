<template>
  <section>
    <h2 style="text-align: center;">Journal Entries</h2>
    <h4 style="text-align: center;">What is God doing in your life today?</h4>
    <br />
    <div class="controls">
      <router-link to="/create" class="newpagebutton">Add new entry</router-link>
    </div>
  </section>
    <section>
    <div class="entries">
      <div v-if="(entries.length > 0)" >
      <ul>
        <default-card class="entries">
        <JournalEntryComponent v-for="entry in entries"
         :key="entry.id"
         :id="entry.id"
         :title="entry.title" 
         :entryBody="entry.entryBody"
         :entryDate="entry.entryDate">
        </JournalEntryComponent>
      </default-card>
      </ul>

    </div> 
    <div v-else>
      There are either no journal entries or our servers are down. 
    </div>
    </div>
  </section>

</template>
 
<script>
import JournalEntriesAPI from '@/services/journalentriesapi';
import JournalEntryComponent from '../JournalEntryComponent.vue';
export default {
components: {
  JournalEntryComponent
},

data() {
  return {
    entries: []
    
  }
},
mounted() {
  this.loadEntries();
},
methods: {
  async loadEntries() {
    const response = await JournalEntriesAPI.getJournalEntries();
    this.entries = response.data;
  }
}
}
</script>

<style scoped>
ul {
list-style: none;
margin: 0;
padding: 0;
}

.controls {

}
.entries {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>