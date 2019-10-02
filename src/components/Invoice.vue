<template>
<div>
<div class="new">
  <v-layout row>
    <div class="mx-auto">
      <v-btn class="ml-12" @click="printData">
        <v-icon>print</v-icon>Print Receipt
      </v-btn>
    </div>
    <v-btn class="mx-auto" dark to="/">
      New Order
      <v-icon>arrow_right_alt</v-icon>
    </v-btn>
  </v-layout>
</div>
<div align="center">
  <h2>dsad</h2>
</div>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Invoice',
  created () {
    this.fetchOrder(this.$route.params.id)
  },
  data: () => ({
    detailOrder: null
  }),
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    printData () {
      window.frames['print_frame'].document.body.innerHTML = document.getElementById('printTable').innerHTML
      window.frames['print_frame'].window.focus()
      window.frames['print_frame'].window.print()
    },
    fetchOrder (id) {
      let proUrl = 'http://192.168.0.108/pos/api/order/' + id
      let userData = this.userData
      let headerConfigProduct = {
        headers: {
          'x-api-key': '123456',
          Authorization: userData.token
        }
      }
      axios.get(proUrl, headerConfigProduct)
        .then(res => {
          this.detailOrder = res.data.data
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style>
@media print {
  * {
    display: none;
  }
  #printTable {
    display: block;
  }
}
  /* table { page-break-after:auto }
  tr    { page-break-inside:avoid; page-break-after:auto }
  td    { page-break-inside:avoid; page-break-after:auto } */

.btnstl {
  float: left;
  margin-right: 20px;
}
.crd {
  width: 300px;
  height: 320px;
  background-color: #f0facd;
  page-break-inside: avoid;
}
.desgn {
  float: right;
}
.sz {
  margin-left: 10px;
}
.new {
  padding-left: 20px;
  padding-top: 20px;
}
</style>
