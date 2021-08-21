<template>
  <v-carousel
    cycle
    height="400"
    :interval="2500"
    hide-delimiter-background
    :show-arrows="false"
    id="building"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        height="100%"
        id="a"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        'First',
        'Second',
        'Third',

      ],
    }
  },
}
</script>

<style scoped>
#building {
  background: url("../../assets/pic/car.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
#a {
  background-color: rgba(0, 0, 0, 0);
  border-color: #ffffff;
  color: rgba(255, 255, 255, 0.87);
}
</style>