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
.mybutton {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #775DAB;
  border: 1px solid #775DAB;
  color: white;
  cursor: pointer;
  border-radius: 20px;
   display: block; 
  margin: 0 auto; 
  text-align:center;
}
.newpagebutton {
  background-color: transparent;
  color: #775DAB;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  cursor: pointer;
  border-radius: 20px;
   display: block; 
  margin: 0 auto; 
  text-align:center;
}

</style>
