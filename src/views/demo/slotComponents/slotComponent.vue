<template>
  <div>
    <!-- 1、默认插槽 -->
    <!-- <slot /> -->
    <!-- 2、具名插槽 用于向组件中指定位置插入元素 -->
    <!-- <slot name="header"/> -->
    <!-- 3、作用域插槽 用于再父组件中插入的元素里面返回子组件中的值 -->
    <slot data="user" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '张三'
      }
    }
  }
}
</script>

<style>

</style>
