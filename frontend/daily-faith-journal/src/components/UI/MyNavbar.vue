<!--this is the navbar component displayed at the top of every page in the application
it will conditionally render links based on if the user is logged in or not
also contains a mobile menu that will conditionally render-->
<template>
  <!--navbar, referenced styling and responsiveness from https://www.section.io/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/-->
  <nav class="bg-brand-darkpurple shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-7">
          <!-- Website Logo -->
          <div class="flex items-center py-4 px-2">
            <router-link to="/home"
              ><img
                src="../../assets/dailyfaithjournallogowhitetext.png"
                class="logo mr-2"
            /></router-link>
          </div>
          <!-- Navbar router links -->
          <div class="hidden md:flex items-center space-x-1">
            <div
              v-if="isLoggedIn"
              class="navlink py-4 px-2 font-normal"
            >
              <router-link to="/journalentries">Journal</router-link>
            </div>

            <div
              v-if="isLoggedIn"
              class="navlink py-4 px-2 font-normal hover:text-brand-cream transition duration-300"
            >
              <router-link to="/sermonnotes">Sermon Notes</router-link>
            </div>

            <div
              v-if="isLoggedIn"
              class="navlink py-4 px-2 font-normal hover:text-brand-cream transition duration-300"
            >
              <router-link @click="logoutUser" to="/login">Logout</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu button and contents -->
    <div class="md:hidden flex items-center">
      <button @click="mobileMenuOpen = !mobileMenuOpen">
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="text-3xl ml-6 mb-4 text-brand-cream"
        />
      </button>
    </div>
    <div v-if="mobileMenuOpen">
      <ul>
        <li class="active">
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 py-4 hover:text-brand-cream transition duration-300"
          >
            <router-link to="/home">Home</router-link>
          </div>
        </li>
        <li>
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 py-4 hover:text-brand-cream transition duration-300"
          >
            <router-link to="/journalentries">Journal</router-link>
          </div>
        </li>
        <li>
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 py-4 hover:text-brand-cream transition duration-300"
          >
            <router-link to="/sermonnotes">Sermon Notes</router-link>
          </div>
        </li>
        <li>
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 py-4 hover:text-brand-cream transition duration-300"
          >
            <router-link @click="logoutUser" to="/login">Logout</router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
/*logo disappears once mobile menu appears*/
@media screen and (max-width: 768px) {
  .logo {
    display: none;
  }
}
.logo {
  width: 80px;
  height: 60px;
}

a:active,
a:hover,
a.router-link-active {

    --tw-text-opacity: 1;
    color: rgb(243 239 224 / var(--tw-text-opacity));
}
</style>
