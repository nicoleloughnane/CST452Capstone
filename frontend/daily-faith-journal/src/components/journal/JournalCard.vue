<template>
  <div class="flex justify-between items-center">
    <div class="block rounded-2xl shadow-xl bg-white w-full">
      <div class="p-6 text-center">
        <div class="m-4">
          <!--conditionally render whatever mood the user chose-->
          <div class="flex items-center justify-start">
            <!--moods: happy, content, okay, upset, sad, or distressed-->
            <div v-if="entry.mood == 'happy'">
              <Icon icon="tabler:mood-happy" width="42" height="42" class="text-brand-darkpurple" />
            </div>
            <div v-else-if="entry.mood == 'content'">
              <Icon icon="tabler:mood-smile" width="42" height="42" class="text-brand-darkpurple" />
            </div>
            <div v-else-if="entry.mood == 'okay'">
              <Icon icon="uil:meh" width="42" height="42" class="text-brand-darkpurple" />
            </div>
            <div v-else-if="entry.mood == 'upset'">
              <Icon icon="tabler:mood-sad-squint" width="42" height="42" />
            </div>
            <div v-else-if="entry.mood == 'sad'">
              <Icon icon="tabler:mood-sad" width="42" height="42" class="text-brand-darkpurple" />
            </div>
            <div v-else-if="entry.mood == 'distressed'">
              <Icon icon="tabler:mood-cry" width="42" height="42" />
            </div>
            <!--edit and delete icons-->
            <div class="flex ml-auto">
              <router-link :to="`/journalentries/edit/${entry._id}`">
                <Icon icon="material-symbols:edit-square-outline" class=" mr-6 text-brand-darkpurple" width="32"
                  height="30" />
              </router-link>
              <router-link :to="`/journalentries/delete/${entry._id}`">
                <Icon icon="ion:trash-outline" width="32" height="32" class=" text-brand-darkpurple" />
              </router-link>
            </div>
          </div>

          <!--this allows the card to be clickable to view the details of a specific entry-->
          <div class="card cursor-pointer" @click="this.$router.push('/journalentries/view/' + entry._id)">
            <!--Entry properties-->
            <h3 class="text-xl font-bold mb-4">{{ entry.title }}</h3>
            <h4 hidden>{{ entry._id }}</h4>
            <h4 class="text-sm mb-4">{{ entry.entryDate }}</h4>
            <h4 class="text-base">{{ entry.entryBody }}</h4>

          </div>
        </div>

      </div>
    </div>
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



