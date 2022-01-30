<template>
  <div>
    <b-card class="wizard-container">
      <b-row>
        <b-col cols="12" md="6">
          <payment-card @setCardData="setCardData" />
        </b-col>
        <b-col cols="12" md="6">
          <h3>{{hotel.name}} ({{hotel.city}})</h3>
          <div class="d-flex justify-content-around mt-3">
            <div>
              <h5>Giriş Tarihi</h5>
              <p>{{convertToLocaleDateFormat(booking.start_date)}}</p>
            </div>
            <div>
              <h5>Çıkış Tarihi</h5>
              <p>{{convertToLocaleDateFormat(booking.end_date)}}</p>
            </div>
          </div>
          <div class="d-flex justify-content-around mt-3">
            <div>
              <h5>Yetişkin</h5>
              <p>{{booking.adult}}</p>
            </div>
            <div>
              <h5>Çocuk</h5>
              <p>{{booking.child}}</p>
            </div>
          </div>
          <div class="d-flex justify-content-around mt-3">
            <div>
              <h5>Oda Tipi</h5>
              <p>{{roomType.title }}</p>
            </div>
            <div>
              <h5>Manzara</h5>
              <p>{{roomScenic.title}}</p>
            </div>
          </div>
          <div class="d-flex justify-content-around mt-3">
            <div>
              <b-form-input v-model="coupon_code" placeholder="Kupon Kodu"></b-form-input>
            </div>
            <div>
              <b-button variant="primary" @click="addCode()"><span v-if="isLoading"><b-spinner small type="grow"></b-spinner></span> Kodu Kullan</b-button>
            </div>
          </div>
          <div class="d-flex justify-content-around mt-5 border-bottom">
            <div class="text-left">
              <p class="font-weight-bolder">Oda Fiyatı</p>
              <p class="font-weight-bolder">Fiyat Etki Oranı</p>
              <p class="font-weight-bolder">Konaklama ( {{diffDays(booking.start_date, booking.end_date)}} Gün)</p>
              <p class="font-weight-bolder">İndirim( <span class="text-uppercase">{{coupon_code}}</span> )</p>
            </div>
            <div class="text-right">
              <p class="font-weight-bolder">{{roomType.price ? roomType.price.toLocaleString('tr-TR') : 0}} ₺</p>
              <p class="font-weight-bolder">%{{roomScenic.price_rate}}</p>
              <p class="font-weight-bolder">{{(diffDays(booking.start_date, booking.end_date) * roomType.price).toLocaleString('tr-TR')}} ₺</p>
              <p class="font-weight-bolder"><span v-if="discountAmount">-</span>{{discountAmount}}</p>
            </div>
          </div>
          <div class="mt-5">
              <h5>TOPLAM TUTAR</h5>
              <h3>{{totalPrice.toLocaleString('tr-TR')}} ₺</h3>
            </div>
        </b-col>
      </b-row>
    </b-card>
    <div class="d-flex justify-content-between mt-3">
      <b-button variant="primary" @click="goBack()">Geri</b-button>
      <b-button variant="primary" @click="save()">Ödeme Yap ve Bitir</b-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import PaymentCard from './PaymentCard.vue'
import helper from '@/mixins/helper'

export default {
  name: 'PaymentPage',
  components: {
    PaymentCard
  },
  data () {
    return {
      hotel: [],
      booking: [],
      roomType: {},
      roomScenic: {},
      coupon_code: null,
      discountAmount: 0,
      isLoading: false
    }
  },
  validations: {
    booking: {
      card_cvv: {
        required
      },
      card_date_month: {
        required
      },
      card_date_year: {
        required
      },
      card_name: {
        required
      },
      card_number: {
        required
      }
    }
  },
  mixins: [helper],
  computed: {
    ...mapState(['couponDetails']),
    totalPrice () {
      let visitors = this.booking.adult
      if (this.booking.child) {
        visitors += this.booking.child
      }
      const roomPrice = (this.roomType.price + (this.roomType.price * this.roomScenic.price_rate) / 100) * Number(visitors) * this.diffDays(this.booking.start_date, this.booking.end_date) - this.discountAmount
      return roomPrice
    }
  },
  mounted () {
    this.hotel = JSON.parse(localStorage.getItem('selectedHotel')) || []
    this.booking = JSON.parse(localStorage.getItem('booking')) || []
    this.hotel.room_scenic.map(room => {
      if (room.id === this.booking.room_scenic) {
        this.roomScenic = room
      }
    })
    this.hotel.room_type.map(room => {
      if (room.id === this.booking.room_type) {
        this.roomType = room
      }
    })
  },
  methods: {
    addCode () {
      this.isLoading = true
      this.$store.dispatch('getCouponDetail', { ...this.query, coupon_code: this.coupon_code }).then(() => {
        this.isLoading = false
        const checkExpritionDate = this.expirationDateControl(this.couponDetails.expiration_at)
        if (checkExpritionDate) {
          this.discountAmount = this.couponDetails.discount_ammount
        } else {
          this.$bvToast.toast('Kuponun süresi dolmuştur.', {
            title: 'Hata!',
            variant: 'danger',
            solid: true
          })
        }
      })
    },
    setCardData (value) {
      this.booking = {
        ...this.booking,
        ...value
      }
    },
    goBack () {
      this.$emit('tabIndex', 1)
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$bvToast.toast('Lütfen kart bilgilerini eksiksiz giriniz.', {
          title: 'Hata!',
          variant: 'danger',
          solid: true
        })
      } else {
        this.booking.price = this.totalPrice
        this.booking.coupon_code = this.coupon_code
        this.$store.dispatch('addBooking', { ...this.query, data: this.booking })
      }
    }
  }
}
</script>
