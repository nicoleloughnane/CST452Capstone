<!--this is a button component that can perform an action upon being clicked and/or take the user to a new page
it also will look different based on what buttonType is passed in as a prop. default is primary-->
<template>
    <!--switch between a button and a router link-->
    <button v-if="!link" :class="buttonClass">
        {{ text }}
    </button>
    <router-link v-else :to="to" :class="buttonClass">
      {{ text }}
    </router-link>
</template>

<script>
export default {
    props: {
      //style of button
        buttonType: {
            type: String,
            required: false,
            default: "primary"
        },
        //if the button is a link
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        //where the button will link the user to.. default is '/'
        to: {
            type: String,
            required: false,
            default: '/'
        },
        //text the button contains
        text: {
          type: String,
          required: true
        }
    },
    computed: {
      buttonClass() {
        return {
          [this.buttonType]: true
        }
      }
    }
}
</script>

<style scoped>
 /*below are all styles for the buttons utilizing tailwind and brand colors outlined in tailwind.config.js */

        .primary {
            @apply text-white bg-brand-darkpurple hover:shadow-pink rounded-lg px-4 py-2 font-medium;
        }
        .secondary {
            @apply bg-white outline outline-brand-gray outline-1 text-brand-gray hover:bg-brand-darkpurple rounded-lg  px-4 py-2 hover:text-white font-medium;
        }
        .delete {
            @apply bg-brand-red text-white hover:shadow-cream rounded-lg px-4 py-2 font-medium;
        }
        .create {
            @apply bg-brand-green text-white hover:shadow-cream rounded-lg px-4 py-2 font-medium;
        }
        .search {
          @apply bg-transparent text-blue-500 hover:bg-brand-darkpurple px-2 py-2 hover:text-white font-normal;
        }

</style>