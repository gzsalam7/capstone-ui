<template class="background">
  <fixed-header>
    <div class="navbar">
      <p class="title">GESTURE RECOGNITION UI</p>
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
   background-color: #00909e;
   border-bottom: .2em solid #0275d8;
   justify-content: center;
 }
 .navbar.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
}

  .title {
    font-size: 1.7em;
    font-weight: 600;
    margin-bottom: 0px;
  }
</style>

