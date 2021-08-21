<template>
  <div id="homepage">
    <car />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import Car from './HomePage/car.vue'

export default {
  name: 'Home',

  components: {
    HelloWorld,
    Car
  },
}
</script>
