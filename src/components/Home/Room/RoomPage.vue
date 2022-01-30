<template>
  <div>
    <b-card class="p-3 wizard-container">
      <b-row class="hotel-information">
        <div class="w-100 text-left mb-2">
          <b>{{hotel.name}}: </b><span class="ml-2">({{ hotel.city}})</span>
        </div>
        <div>
          <b>Giriş Tarihi: </b><span>{{convertToLocaleDateFormat(booking.start_date)}}</span> - <b>Çıkış Tarihi: </b> <span>{{convertToLocaleDateFormat(booking.end_date)}}</span> - <b>Yetişkin: </b> <span>{{booking.adult}}</span> - <b>Çocuk:</b> <span>{{booking.child}}</span>
        </div>
      </b-row>
      <b-row class="mt-5 room-type">
        <h3 class="title">Oda Tipi Seçimi</h3>
        <div class="box">
          <room-type v-model="room_type" :id="roomType.id" :days="diffDays(booking.start_date, booking.end_date)" :child="Number(booking.child)" :adult="Number(booking.adult)" :photo="roomType.photo" :title="roomType.title" :price="roomType.price" v-for="(roomType, key) in hotel.room_type" :key="key" />
        </div>
      </b-row>
      <b-row class="mt-5 room-view">
        <h3 class="title">Manzara Seçimi</h3>
        <div class="box">
          <room-scenic v-model="room_scenic" :id="roomScenic.id" :photo="roomScenic.photo" :title="roomScenic.title" :price-rate="roomScenic.price_rate" v-for="(roomScenic, key) in hotel.room_scenic" :key="key" />
        </div>
      </b-row>
    </b-card>
    <div class="d-flex justify-content-between mt-3">
      <b-button variant="primary" @click="goBack()">Geri</b-button>
      <b-button variant="primary" @click="save()">Kaydet Ve Devam Et</b-button>
    </div>
  </div>
</template>
<script>
import RoomType from './RoomType'
import RoomScenic from './RoomScenic'
import { required } from 'vuelidate/lib/validators'
import helper from '@/mixins/helper'

export default {
  components: { RoomType, RoomScenic },
  name: 'RoomPage',
  mixins: [helper],
  data () {
    return {
      hotel: [],
      booking: [],
      room_type: null,
      room_scenic: null
    }
  },
  validations: {
    room_type: {
      required
    },
    room_scenic: {
      required
    }
  },
  mounted () {
    this.hotel = JSON.parse(localStorage.getItem('selectedHotel')) || []
    this.booking = JSON.parse(localStorage.getItem('booking')) || []
  },
  methods: {
    goBack () {
      this.$emit('tabIndex', 0)
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$bvToast.toast('Oda Tipi ve Manzara seçimi yapınız.', {
          title: 'Hata!',
          variant: 'danger',
          solid: true
        })
      } else {
        const booking = JSON.parse(localStorage.getItem('booking'))
        booking.room_type = this.room_type
        booking.room_scenic = this.room_scenic
        localStorage.setItem('booking', JSON.stringify(booking))
        this.$emit('tabIndex', 2)
      }
    }
  }
}
</script>
<style lang="scss">
  .hotel-information {
    div:first-child {
      b, span {
        font-size: 1.5rem;
      }
    }
    div:nth-child(2) {
      font-size: 1.2rem;
    }
  }
  .room-type, .room-view {
    .title {
      width: 100%;
      border-bottom: 1px solid gray;
      text-align: left;
      line-height: 2;
    }
    .box {
      display: grid;
      grid-gap: 1rem;
      grid-auto-flow: column;
      grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
      overflow-x: auto;
    }
  }
</style>
