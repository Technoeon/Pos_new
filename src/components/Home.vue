<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-left>
        <v-flex xs12 md4>
          <cartpage @keydown.esc="getFromKeyPad()"></cartpage>
        </v-flex>
        <v-flex xs12 md8>
          <productpage></productpage>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import productpage from './home/Productpage'
import cartpage from './home/CartPage'
export default {
  created () {
    window.addEventListener('keyup', this.getFromKeyBoard)
  },
  components: { productpage, cartpage },
  data () {
    return {
    }
  },
  methods: {
    getFromKeyBoard (event) {
      var _key = (window.Event) ? event.which : event.keyCode
      if (_key > 95 && _key < 106) {
        String.fromCharCode(event.keyCode - 48)
      }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
