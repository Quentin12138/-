<template>
  <!-- 放置一个图标 -->
  <div class="screenWrapper">
    <svg-icon
      :icon-class="isFull ? 'exit-fullscreen' : 'fullscreen'"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      // 是否全屏的状态，false 为非全屏
      isFull: false
    }
  },
  mounted() {
    // document.addEventListener('fullscreenchange', () => {
    //   this.isFull = !!document.fullscreenElement
    // })
    screenfull.on('change', () => {
      this.isFull = screenfull.isFullscreen
    })
  },
  methods: {
    toggleScreen() {
      if (this.isFull) {
        // 切换为全屏
        // document.exitFullscreen()
        screenfull.exit()
      } else {
        // 退出全屏
        // document.documentElement.requestFullscreen()
        screenfull.request()
      }
      this.isFull = !this.isFull
      console.log(123)
    }
  }
}
</script>

<style lang="scss" scoped>
.screenWrapper {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.fullscreen {
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
