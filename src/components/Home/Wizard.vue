<template>
  <div>
    <!-- Tabs with card integration -->
      <b-tabs class="wizard-tab" v-model="tabIndex" nav-class="py-4">
        <template #tabs-start>
          <div class="line"></div>
        </template>
        <b-tab>
          <template #title>
            <span class="wizard-icon-border">
              <b-icon icon="calendar2-check" class="rounded-circle" scale="1"></b-icon>
            </span>
          </template>
          <date-page @tabIndex="setTabIndex" />
        </b-tab>
        <b-tab lazy>
          <template #title>
            <span class="wizard-icon-border">
              <b-icon icon="house" class="rounded-circle" scale="1"></b-icon>
            </span>
          </template>
          <room-page @tabIndex="setTabIndex" />
        </b-tab>
        <b-tab lazy>
          <template #title>
            <span class="wizard-icon-border">
              <b-icon icon="credit-card2-front" class="rounded-circle" scale="1"></b-icon>
            </span>
          </template>
          <payment-page @tabIndex="setTabIndex" />
          </b-tab>
      </b-tabs>
  </div>
</template>

<script>
import DatePage from './DatePage.vue'
import RoomPage from './Room/RoomPage.vue'
import PaymentPage from './Payment/PaymentPage.vue'
export default {
  name: 'Wizard',
  components: {
    DatePage,
    RoomPage,
    PaymentPage
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    setTabIndex (value) {
      this.tabIndex = value
    }
  }
}
</script>
<style lang="scss">
  .wizard-tab {
    .line {
      height: 2px;
      background: #e0e0e0;
      position: absolute;
      width: 90%;
      margin: 0 auto;
      left: 0;
      right: 0;
      top: 50%;
      z-index: -1;
    }
    .nav-tabs {
      justify-content: space-between;
      position: relative;
      border-bottom: unset;
      .nav-item {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.65;
        &:focus-visible {
          outline: none;
        }
        .wizard-icon-border {
          width: 70px;
          height: 70px;
          line-height: 70px;
          display: inline-block;
          border-radius: 100px;
          background: #fff;
          border: 2px solid #e0e0e0;
          z-index: 2;
          text-align: center;
          font-size: 25px;
        }
        .nav-link {
          border: none;
          &:focus-visible {
            outline: none;
          }
        }
        .nav-link.active {
          background-color: transparent;
          border: none;
        }
      }
    }
    .tab-pane {
      .wizard-container {
        height: calc(100vh - 300px);
        overflow: auto;
      }
    }
    .tab-content {
      padding: 8px 16px;
    }

  }
</style>
