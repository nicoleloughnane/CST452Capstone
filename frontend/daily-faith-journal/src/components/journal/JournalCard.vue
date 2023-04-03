<template>

    <div class="block rounded-2xl shadow-xl bg-white w-full">
      <div class="card-header">
          <!--conditionally render whatever mood the user chose-->
          <div class="flex items-center justify-start ">
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
              <Icon icon="tabler:mood-cry" width="42" height="42" class="text-white"/>
            </div>
            <!--journal entry title-->
            
            <h3 class="text-xl font-medium mt-4 text-white text-center grow mb-4 ml-12">{{ entry.title }}</h3>
            <!--edit and delete icons-->
            <div class="header-icons">
              <router-link :to="`/journalentries/edit/${entry._id}`">
                <Icon icon="material-symbols:edit-square-outline" class=" mr-6 text-white" width="32"
                  height="30" />
              </router-link>
              <router-link :to="`/journalentries/delete/${entry._id}`">
                <Icon icon="ion:trash-outline" width="32" height="32" class=" text-white" />
              </router-link>
            </div>
          </div>
        </div>
          <!--this allows the card to be clickable to view the details of a specific entry-->
          <div class="card cursor-pointer p-6" @click="this.$router.push('/journalentries/view/' + entry._id)">
            <!--Entry properties-->
            <h4 hidden>{{ entry._id }}</h4>
            <h4 class="text-base">{{ entry.entryBody }}</h4>

          </div>
          <h4 class="text-sm mb-4 ml-6 italic text-left">{{ entry.entryDate }}</h4>

    </div>

</template>
<script>
import { Icon } from '@iconify/vue';
export default {
  name: "JournalCard",
  components: {
    Icon
  },
  //Each card requires a journal entry object
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
 .card-header {
    border-radius: 16px;
    background-color: #775DAB;
  padding-left: 6px;
  padding-right: 6px;
    
  }
  .header-icons {
    display:flex;
  }
</style>


