import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import { ToastPlugin } from 'bootstrap-vue'

Vue.use(Vuex)
Vue.use(ToastPlugin)

axios.defaults.baseURL = 'https://5f6d939160cf97001641b049.mockapi.io/tkn/'
export default new Vuex.Store({
  state: {
    hotels: [],
    hotelDetails: [],
    couponDetails: []
  },
  mutations: {
    setHotels (state, payload) {
      state.hotels = payload
    },
    setHotelDetails (state, payload) {
      state.hotelDetails = payload
    },
    setCouponDetails (state, payload) {
      state.couponDetails = payload
    }
  },
  actions: {
    getHotels ({ commit }) {
      return axios
        .get('hotels')
        .then((res) => {
          commit('setHotels', res.data)
        })
        .catch((err) => {
          this._vm.$bvToast.toast(err, {
            title: 'Hata!',
            variant: 'danger',
            solid: true
          })
        })
    },
    getHotelDetail ({ commit }) {
      return axios
        .get('hotel-details')
        .then((res) => {
          commit('setHotelDetails', res.data)
        })
        .catch((err) => {
          this._vm.$bvToast.toast(err, {
            title: 'Hata!',
            variant: 'danger',
            solid: true
          })
        })
    },
    getCouponDetail ({ commit }, query) {
      return axios
        .get(`coupons?code=${query.coupon_code}`)
        .then((res) => {
          commit('setCouponDetails', res.data[0])
        })
        .catch((err) => {
          this._vm.$bvToast.toast(err, {
            title: 'Hata!',
            variant: 'danger',
            solid: true
          })
        })
    },
    addBooking ({ commit }, query) {
      return axios
        .post('hotel-bookings', query.data)
        .then((res) => {
          if (res.status === 201) {
            this._vm.$bvToast.toast('Rezervasyon oluşturuldu', {
              title: 'Başarılı!',
              variant: 'success',
              solid: true
            })
            localStorage.clear()
            router.push({ name: 'Booking', params: { id: res.data.id } })
          }
        })
        .catch((err) => {
          this._vm.$bvToast.toast(err, {
            title: 'Hata!',
            variant: 'danger',
            solid: true
          })
        })
    },
    cancelBooking ({ commit }, query) {
      return axios
        .delete(`hotel-bookings/${query.id}`)
        .then((res) => {
          if (res.status === 200) {
            this._vm.$bvToast.toast('Kayıt Silindi', {
              title: 'Başarılı!',
              variant: 'success',
              solid: true
            })
            router.push({ name: 'Home' })
          }
        })
        .catch((err) => {
          this._vm.$bvToast.toast(err, {
            title: 'Hata!',
            variant: 'danger',
            solid: true
          })
        })
    }
  }
})
