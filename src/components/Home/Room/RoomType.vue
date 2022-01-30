<template>
  <div @click="chooseRoomType()">
    <h5 class="text-left">{{title}}</h5>
    <b-card class="room-card" :style="selected && id === value ? 'border: 3px solid green' : ''" :img-src="photo" img-top>
      <div class="text-left">
        <p class="mb-0">{{days}} Gün</p>
        <p class="mb-0">{{adult}} Yetişkin</p>
        <p class="mb-0" v-if="child > 0">{{child}} Çocuk</p>
      </div>
      <p class="price">{{totalPrice}} ₺</p>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'RoomType',
  data () {
    return {
      selected: false
    }
  },
  props: {
    photo: {
      type: String
    },
    price: {
      type: Number
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    id: {
      type: Number,
      required: true
    },
    days: {
      type: Number
    },
    adult: {
      type: Number
    },
    child: {
      type: Number
    },
    value: {
      required: true
    }
  },
  computed: {
    totalPrice () {
      let total = this.price * this.days
      if (this.child) {
        total *= this.child + this.adult
      } else {
        total *= this.adult
      }
      return (total).toLocaleString('tr-TR')
    }
  },
  methods: {
    chooseRoomType () {
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
