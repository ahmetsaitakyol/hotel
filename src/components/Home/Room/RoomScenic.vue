<template>
  <div class="mb-3" @click="chooseRoomScenic()">
    <h5 class="text-left">{{title}}</h5>
    <b-card class="room-card" :style="selected && id === value ? 'border: 3px solid green' : ''" :img-src="photo" img-top>
      <div class="text-left">
        <p class="mb-0">Fiyata Etki Oranı</p>
      </div>
      <p class="price">+{{priceRate}}%</p>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'RoomScenic',
  data () {
    return {
      selected: false
    }
  },
  props: {
    photo: {
      type: String
    },
    priceRate: {
      type: Number
    },
    title: {
      type: String
    },
    id: {
      type: Number
    },
    value: {
      required: true
    }
  },
  methods: {
    chooseRoomScenic () {
      this.selected = true
      this.$emit('input', this.id)
    }
  }
}
</script>
<style lang="scss">
  .room-card {
    cursor: pointer;
    padding: 1rem;
    min-width: 250px !important;
    .card-body {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0 0 0;
      .price {
        font-size: 1.7rem;
        font-weight: 800;
      }
    }
  }
</style>
