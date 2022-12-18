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
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300&family=Open+Sans&display=swap');
* {
box-sizing: border-box;
}

html {
  font-family: 'Libre Franklin', sans-serif;
}

body {
margin: 0;
}


</style>
