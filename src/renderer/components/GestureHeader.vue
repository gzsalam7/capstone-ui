<template class="background">
  <fixed-header>
    <div class="navbar">
      <h2>Gesture Navigation</h2>
    </div>
  </fixed-header>
</template>
 
<script>
import FixedHeader from 'vue-fixed-header'

export default {
  components: {
    FixedHeader
  }
}
</script> 
<style scoped>

 .navbar {
   background-color: 255, 2, 255, 0.5;
 }
 .navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
}
</style>

