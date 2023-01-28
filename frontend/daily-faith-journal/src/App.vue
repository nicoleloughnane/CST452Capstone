<template>
  <my-navbar></my-navbar>
  <router-view></router-view>
</template>

<script>
  import MyNavbar from './components/UI/MyNavbar.vue';
export default {
  components: {
      MyNavbar
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
}
</script>


<style>

* {
box-sizing: border-box;
}

body {
margin: 0;
}


</style>
