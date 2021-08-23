<template>
  <div id="homepage">
    <car />
    <info />
    
    
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import Car from './HomePage/car.vue'
import Info from './HomePage/Info.vue'

export default {
  name: 'Home',

  components: {
    HelloWorld,
    Car,
    Info
  },
}
</script>
