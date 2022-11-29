<template>
  <div>
    <svg-icon
      icon-class="isFull ? 'exit-fullscreen' : 'fullscreen'"
      class="fullscree"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
export default {
  name: 'ScreenFull',
  data() {
    return {
      // 是否全屏的状态，false 为非全屏
      isFull: false
    }
  },
  methods: {
    toggleScreen() {
      if (this.isFull) {
        // 切换为全屏
        document.exitFullscreen()
      } else {
        // 退出全屏
        document.documentElement.requestFullscreen()
      }
      this.isFull = !this.isFull
      console.log(123)
    }
  }
}
</script>

<style>

</style>
