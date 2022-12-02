<template>
  <v-card @click="$emit('play', chart)">
    <v-img
      :src="srcImage"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    chart: {
      type: Object,
      default: null
    },
  },
  computed: {
    srcImage() {
      return this.chart?.images?.coverart
    }
  },
}
</script>

<style>

</style>
