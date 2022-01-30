<template>
  <div>
    <b-card class="wizard-container">
      <b-row>
        <b-col>
          <b-form-group label="Giriş Tarihi" label-class="text-left" :class="{ 'form-group--error': $v.date.hotel_id.$error }">
            <b-form-select v-model.trim="$v.date.hotel_id.$model" :options="hotels" @change="selectHotel" text-field="hotel_name" value-field="id" size="lg" class="mt-3">
              <template #first>
                <b-form-select-option :value="null" disabled>Lütfen otel seçiniz.</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
            <b-alert v-if="!childStatus" show variant="warning">Çocuk ziyaretçi kabul edilmiyor!</b-alert>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="Giriş Tarihi" label-class="text-left" :class="{ 'form-group--error': $v.date.start_date.$error }">
            <b-form-datepicker :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric'}" :min="new Date()" v-model.trim="$v.date.start_date.$model" locale="tr"></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="Çıkış Tarihi" label-class="text-left" :class="{ 'form-group--error': $v.date.end_date.$error }">
            <b-form-datepicker :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric'}" :min="new Date()" v-model="date.end_date" locale="tr"></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="Yetişkin Sayısı" label-class="text-left" :class="{ 'form-group--error': $v.date.adult.$error }">
            <b-form-input v-model="date.adult" type="number" :min="0" :max="maxAdultSize" placeholder="Enter your name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6" md="3">
          <b-form-group label="Çocuk Sayısı" label-class="text-left" :class="{ 'form-group--error': $v.date.child.$error }">
            <b-form-input v-model="date.child" type="number" :min="0" :max="5" :disabled="!childStatus" placeholder="Enter your name"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <div class="d-flex justify-content-end">
      <b-button-group class="mt-2">
        <b-button variant="primary" @click="save()">Kaydet Ve Devam Et</b-button>
      </b-button-group>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, between } from 'vuelidate/lib/validators'

export default {
  name: 'DatePage',
  data () {
    return {
      options: [],
      date: {
        hotel_id: null,
        start_date: null,
        end_date: null,
        adult: 1,
        child: 0
      },
      hotel: [],
      childStatus: true,
      maxAdultSize: 5
    }
  },
  validations: {
    date: {
      hotel_id: {
        required
      },
      start_date: {
        required
      },
      end_date: {
        required
      },
      adult: {
        required,
        between (value) {
          return between(0, this.maxAdultSize)(value)
        }
      },
      child: {
        required,
        between: between(0, 5)
      }
    }
  },
  computed: {
    ...mapState(['hotels', 'hotelDetails'])
  },
  mounted () {
    this.$store.dispatch('getHotels')
    this.$store.dispatch('getHotelDetail')
  },
  methods: {
    selectHotel () {
      this.hotelDetails.map(item => {
        if (Number(item.hotel_id) === Number(this.date.hotel_id)) {
          this.hotel = item
        }
      })
      this.maxAdultSize = this.hotel.max_adult_size
      this.childStatus = this.hotel.child_status
      this.hotel.name = this.hotels[this.date.hotel_id].hotel_name
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$bvToast.toast('Lütfen tüm alanları doldurunuz.', {
          title: 'Hata!',
          variant: 'danger',
          solid: true
        })
      } else {
        localStorage.setItem('booking', JSON.stringify(this.date))
        localStorage.setItem('selectedHotel', JSON.stringify(this.hotel))
        this.$emit('tabIndex', 1)
      }
    }
  }
}
</script>
