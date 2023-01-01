<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
 /*rounded corners, shadow */
  border-radius: 12px; 
  box-shadow: 0 2px 8px #00000042;
  margin: 2rem auto;
  max-width: 40rem;
  /* flexbox */
  display: flex;  
  justify-content: center;  
  align-items: center; 
}
</style>