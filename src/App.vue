<template>
  <div id="app">
    <Header />
    <main>
      <b-container>
        <router-view/>
      </b-container>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  .form-group--error {
    color: #ff0000 !important;
    & legend {
      color: #ff0000 !important
    }
    .form-control, .vs__dropdown-toggle, .custom-select  {
      border: 1px #ff0000 solid !important;
      background: #ff000005 !important;
    }
  }
}

main {
  height: calc(100vh - 77px);
  overflow-y: auto
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
