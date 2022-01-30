<template>
  <b-row class="booking p-5">
    <b-card>
      <b-icon icon="calendar2-check" class="calendar"></b-icon>
      <h5 class="mt-3">Rezervasyon kaydınız alınmıştır.</h5>
      <p class="mt-3">Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</p>
      <div class="d-flex justify-content-center">
      <b-button-group class="mt-2">
        <b-button variant="primary" @click="newBooking()">Yeni Rezervasyon</b-button>
        <b-button class="mx-2" variant="primary">Rezervasyonu Güncelle</b-button>
        <b-button variant="primary" @click="cancelBooking()">Rezervasyonu İptal Et</b-button>
      </b-button-group>
    </div>
    </b-card>
  </b-row>
</template>

<script>

export default {
  methods: {
    newBooking () {
      localStorage.clear()
      this.$router.push({ name: 'Home' })
    },
    cancelBooking () {
      this.$store.dispatch('cancelBooking', { ...this.query, id: this.$route.params.id })
    }
  }
}
</script>
<style lang="scss">
  .booking {
    .calendar {
      width: 120px;
      height: 120px;
      color:green;
    }
  }
</style>
