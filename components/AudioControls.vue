<template>
  <v-footer fixed app class="footer px-4">
    <div class="audio-controls">
      <div class="big">
        <img :src="chart.images.coverart" alt="big" class="bigImg" />
      </div>
      <div>
        <v-btn outlined fab small color="light-blue" @click="$emit('click:stop')">
            <v-icon>mdi-stop</v-icon>
          </v-btn>
          <v-btn outlined fab color="light-blue" @click="$emit('click:play')">
            <v-icon large>mdi-play</v-icon>
          </v-btn>
          <v-btn outlined fab small color="light-blue" @click="$emit('click:pause')">
            <v-icon>mdi-pause</v-icon>
          </v-btn>
      </div>
      <v-slider
        style="max-width: 200px"
        v-model="volume"
        prepend-icon="mdi-volume-high"
      ></v-slider>
    </div>
  </v-footer>
</template>

<script>
import { set } from 'vue'
export default {
  props: {
    chart: {type: Object, default: null},
    value: { type: Number, default: 100 },
  },
  computed: {
    volume: {
      get() {
        return this.value
      },
      set(value) {
        console.log(value)
        this.$emit('input', value)
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.footer {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.audio-controls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bigImg {
  border-radius: 99%;
  width: 64px;
  height: 64px;
  -webkit-animation: spinBig 5s linear infinite;
}

@keyframes spinBig {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
