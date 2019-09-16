<template>
  <div>
    <hotellist-item v-for="(item,key) in model"
                    :data="item"
                    :key="key"></hotellist-item>
  </div>
</template>

<script>
export default {
  name: 'hotellist',
  props: {
    model: {
      type: Array,
      required: true
    }
  },
  components: {
    HotellistItem: () => import('./hotellist-item')
  }
}
</script>

<style lang="less" scoped>
</style>