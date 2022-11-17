<template>
  <div>
    <slot-component>
      <!-- 1、默认插槽可以直接插入元素 -->
      <!-- <span>我是父组件中插入的dom元素</span> -->
      <!-- 2、具名插槽 用于向组件中指定位置插入元素 -->
      <!-- 两种写法 v-slot 或 # -->
      <template #header>
        <span>具名插槽插入的dom元素</span>
      </template>
    </slot-component>
  </div>
</template>

<script>
import slotComponent from './slotComponents/slotComponent.vue'
export default {
  components: { slotComponent },
  methods: {
    slotComponent
  }
}
</script>

<style>

</style>
