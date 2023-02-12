<!--NOT CURRENTLY BEING USED-->
<!--This is a Component that contains a search form. made using tailwind css for a search bar. search icon from font awesome.-->
<!--written with the assistance of Vue Masterclass Course on Udemy-->
<template>
    <form class="flex h-10 w-full mb-6 items-center rounded-2xl border border-solid border-brand-darkpurple" @submit.prevent="searchForEntry">
        <font-awesome-icon :icon="['fas', 'search']" class="mx-3"/>

        <div class="flex flex-1 flex-nowrap h-full text-base font-light">
            <div class="flex h-full flex-1 relative items-center pr-3 mx-3 just">
                <label class="absolute -top-12 ml-12">Search For An Entry</label>
                <QueryInput 
                placeholder="keywords" v-model="userEntry"/>
            </div>
        </div>

        <!--submit the form to search for an entry-->
    <default-button text="Search" buttonType="search" class="rounded-r-2xl"  />

    </form>
</template>
<script>
import QueryInput from './QueryInput.vue';
    export default {
    name: "MySearchBar",
    components: {
     QueryInput 
    },
    data() {
        return {
            userEntry: ""
        }
    },
    methods: {
     searchForEntry() {
        this.$router.push('/journalentries/results')
     }
    }
}
</script>
