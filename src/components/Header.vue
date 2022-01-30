<template>
  <div>
    <b-container fluid class="header">
      <router-link class="logo" to="/">
        <p>Otel</p>
      </router-link>
      <div>
         <b-button @click="newBooking" variant="warning">Rezervasyon Yap</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    newBooking () {
      localStorage.clear()
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss">
  .header {
    background: #b4e3f8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    .logo {
      color: black;
      text-decoration: unset;
      line-height: 1.4;
      p:first-child {
        font-size: 2rem;
        font-weight: bolder;
      }
      p {
        margin-bottom: 0;
        font-weight: 500;
      }

    }
  }
</style>
