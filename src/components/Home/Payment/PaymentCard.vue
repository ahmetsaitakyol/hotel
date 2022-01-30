<template>
  <div>
    <div class="credit-card">
      <div class="card-title">
        <span><b>Credit</b><i>Card</i></span>
        <span><b>BANK</b></span>
      </div>
      <div class="d-flex align-items-center">
        <b-icon icon="grid1x2-fill" style="width: 60px; height: 60px;"></b-icon>
        <span class="card-name ml-4">{{card.card_name.toLocaleUpperCase('tr-TR')}}</span>
      </div>
      <div class="text-left mt-2">
        <p class="card-number">{{card.card_number}}</p>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <p class="customer-no">XXXXXXX XXXXXXXX</p>
          <p class="date text-left font-weight-bold">{{getUnitWithZeroPrefix(card.card_date_month)}}/{{card.card_date_year}}</p>
        </div>
        <img src="@/assets/card.jpeg" width="80" alt="card">
      </div>
    </div>
    <div class="credit-card-inputs mt-5">
       <b-row>
          <b-col>
            <b-form-group label="İsim" label-class="text-left" :class="{ 'form-group--error': $v.card.card_name.$error }">
              <b-form-input v-model="card.card_name" placeholder="İsim"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Kart No" label-class="text-left" :class="{ 'form-group--error': $v.card.card_number.$error }">
              <b-form-input v-model="card.card_number" type="tel" v-mask="'#### #### #### ####'" placeholder="Kart No"></b-form-input>
            </b-form-group>
          </b-col>
       </b-row>
       <b-row>
        <b-col cols="12 d-flex justify-content-lg-between">
          <p class="text-left mb-0">Kart Son Kullanma Tarihi</p>
        </b-col>
        <b-col cols="12" sm="3">
          <b-form-group>
            <b-form-select v-model="card.card_date_month" :options="months" size="lg" class="mt-3"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="3">
          <b-form-group>
            <b-form-select v-model="card.card_date_year" :options="years" size="lg" class="mt-3"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="ml-sm-auto cvv" cols="12" sm="3">
          <b-form-group>
            <b-form-input v-model="card.card_cvv" placeholder="CVV"></b-form-input>
          </b-form-group>
        </b-col>
       </b-row>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import helper from '@/mixins/helper'

export default {
  data () {
    return {
      card: {
        card_name: '',
        card_number: null,
        card_date_month: null,
        card_date_year: null,
        card_cvv: null
      },
      months: [
        { value: 1, text: '01' },
        { value: 2, text: '02' },
        { value: 3, text: '03' },
        { value: 4, text: '04' },
        { value: 5, text: '05' },
        { value: 6, text: '06' },
        { value: 7, text: '07' },
        { value: 8, text: '08' },
        { value: 9, text: '09' },
        { value: 10, text: '10' },
        { value: 11, text: '11' },
        { value: 12, text: '12' }
      ],
      years: [
        { value: 2022, text: '2022' },
        { value: 2023, text: '2023' },
        { value: 2024, text: '2024' },
        { value: 2025, text: '2025' },
        { value: 2026, text: '2026' },
        { value: 2027, text: '2027' },
        { value: 2028, text: '2028' },
        { value: 2029, text: '2029' },
        { value: 2030, text: '2030' }
      ]
    }
  },
  validations: {
    card: {
      card_name: {
        required
      },
      card_number: {
        required
      },
      card_date_month: {
        required
      },
      card_date_year: {
        required
      },
      card_cvv: {
        required
      }
    }
  },
  mixins: [helper],
  watch: {
    card: {
      handler (val) {
        this.$emit('setCardData', val)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
  .credit-card {
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 15px;
    .card-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-number {
      font-size: 2rem;
      font-weight: 800;
    }
    .card-name {
      font-size: 1.6rem;
      font-weight: 600
    }
  }
  .credit-card-inputs {
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 15px;
    .cvv {
      display: flex;
      align-items: center;
      .form-group {
        margin: 0;
        div:first-child {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
