<template>
  <v-container fluid>
    <div class="container-card">
      <div
        v-for="(chart, index) in tracksFormatted"
        :key="index"
      >
        <SongCard
          :chart="chart"
          @play="handlePlay($event)"
        />
      </div>
    </div>
    <div>
      <audio :loop="looping" ref="audio" :src="currentTrackSong" @timeupdate="update" @loadeddata="load" @pause="playing = false" @play="playing = true" @ended="handleNextSong()" style="display: none;"></audio>
      <!--<audio
        :ref="PRODUCT_CATEGORY_LIST"
        controls
        :src="track"
        type="audio/mpeg"
        @play="playSong(track)"
      ></audio>-->
    </div>
    <AudioControls
			v-model="volume"
			:key="key"
			v-if="!!currentTrack"
			:chart="currentTrack"
			@click:stop="handleStop"
			@click:play="handlePlay(currentTrack)"
			@click:pause="handlePause"
		/>
  </v-container>
</template>

<script>

const PRODUCT_CATEGORY_LIST = 'PRODUCT_CATEGORY_LIST'

export default {
  props: {
		file: {
			type: String,
			default: null
		},
		autoPlay: {
			type: Boolean,
			default: false
		},
		loop: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		currentSeconds: 0,
    durationSeconds: 0,
    loaded: false,
    looping: false,
    playing: false,
    previousVolume: 35,
    showVolume: false,
    volume: 100,
    charts: null,
    currentAudio: null,
    PRODUCT_CATEGORY_LIST,
    currentTrack: null,
		currentTrackSong: null,
		key: 0

	}),
	computed: {
		currentTime() {
			return this.convertTimeHHMMSS(this.currentSeconds);
		},
		durationTime() {
			return this.convertTimeHHMMSS(this.durationSeconds);
		},
		percentComplete() {
			return parseInt(this.currentSeconds / this.durationSeconds * 100);
		},
		muted() {
			return this.volume / 100 === 0;
		},
		tracksFormatted () {
			return this.charts?.map((track, index) => {
				track.index = index
				return track
			})
		}
	},
	watch: {
		volume(value) {
			this.showVolume = false;
			this.audio.volume = this.volume / 100;
		},
		currentTrack (newValue) {
			if (newValue) {
				this.key += 1
			}
		}
	},
	methods: {
    handlePlay (track) {
			this.currentTrack = track
      this.currentTrackSong = track.hub?.actions[1]?.uri
      setTimeout(() => {
        this.audio.play()
      }, 150)
    },
		handleNextSong () {
			this.currentTrack = this.tracksFormatted[this.currentTrack?.index + 1]
			this.currentTrackSong = this.currentTrack.hub?.actions[1]?.uri
			setTimeout(() => {
        this.audio.play()
      }, 150)
		},
    convertTimeHHMMSS(val) {
      return new Date(val * 1000).toISOString().substr(11, 8);
    },
    async getCharts() {
      const response = await this.$chartAPI.getTopCharts()
      console.log(response)
      this.charts = response
    },
		download() {
			this.handleStop();
			window.open(this.file, 'download');
		},
		load() {
			if (this.audio.readyState >= 2) {
				this.loaded = true;
				this.durationSeconds = parseInt(this.audio.duration);
				return this.playing = this.autoPlay;
			}

			throw new Error('Failed to load sound file.');
		},
		mute() {
			if (this.muted) {
				return this.volume = this.previousVolume;
			}

			this.previousVolume = this.volume;
			this.volume = 0;
		},
		seek(e) {
			if (!this.playing || e.target.tagName === 'SPAN') {
				return;
			}

			const el = e.target.getBoundingClientRect();
			const seekPos = (e.clientX - el.left) / el.width;

			this.audio.currentTime = parseInt(this.audio.duration * seekPos);
		},
		handleStop() {
			this.playing = false;
			this.audio.currentTime = 0;
		},
		update(e) {
			this.currentSeconds = parseInt(this.audio.currentTime);
		},
		handlePause() {
			this.playing = false;
			this.audio.pause()
		}
	},
	created() {
    this.getCharts()
		this.innerLoop = this.loop;
	},
	mounted() {
		this.audio = this.$el.querySelectorAll('audio')[0];
		this.audio.addEventListener('timeupdate', this.update);
		this.audio.addEventListener('loadeddata', this.load);
		this.audio.addEventListener('pause', () => { this.playing = false; });
		this.audio.addEventListener('play', () => { this.playing = true; });
    this.audio.pause()
	}
}
</script>

<style lang="scss" scoped>
.container-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}
</style>
