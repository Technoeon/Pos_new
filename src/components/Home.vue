<template>
<h1>Hello home page</h1>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      selected: false,
      pqty: '1'
    }
  },
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    addToCart (product) {
      product.qty = 1
      product.selected = true
      this.$store.dispatch('addToCart', product)
    },
    cartSelect (id) {
      this.$store.dispatch('selectCart', id)
    }
  }
}
</script>
<style>
 .size {
   width:50;
   height:90;
 }
 .v-card--reveal {
   align-items: center;
   justify-content: center;
   opacity: 0.5;
   width: 100%;
 }
 .v-card h3.display-1 {
   font-size: 24px !important
 }
 .tvalue {
   font-size: 22px;
   size: 30px;
 }
 .flexy {
   float: right;
   margin-right: 20px;
 }
 .divid {
   margin-right: 20px;
 }
 table {
  font-size: 16px;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.trt {
  background-color: #dddddd;
}
.flexy2 {
  float: right;
  margin-right: 10px;
}
</style>
