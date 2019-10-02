<template>
 <div>
    <div>
      <div class="centr">
      <h1>Payment</h1>
      </div>
      <v-layout row class="gred">
        <v-btn large to="/">
          <v-icon>arrow_backward</v-icon>
          Back
        </v-btn>
        <v-btn large v-if="total<=numb" @click="postData" class="rht">
          Validate
          <v-icon>arrow_forward</v-icon>
        </v-btn>
      </v-layout>
    </div>
    <v-divider class="new"></v-divider>
    <v-layout text-center wrap>
      <v-flex xs4>
        <div class="mt-6">
          <v-btn class="sz" x-large color="grey">Cash(BDT)</v-btn>
        </div>
      </v-flex>
      <v-flex xs8>
          <v-btn
          class="sz2"
          color="grey lighten-1"
        >
         <v-layout row  class="gred">
          <h4 class="new2">Due</h4>
          <h4 class="new2">Tendered</h4>
          <h4 class="new2">Change</h4>
          <h4 class="new2">Method</h4>
          </v-layout>
          </v-btn>
          <v-layout row class="gred">
            <v-btn color="green lighten-3" class="sz4"><h2>{{total}}</h2></v-btn>
            <v-btn color="yellow lighten-3" class="sz4"><h2>{{numb}}</h2></v-btn>
            <v-btn color="teal lighten-3" class="sz4" v-if="total<numb"><h2>{{parseInt(numb)-total}}</h2></v-btn>
            <v-btn color="grey lighten-1" class="sz4"><h2>(Cash)</h2></v-btn>
            <v-btn color="grey lighten-1" class="sz5" v-if="total<numb" @click="numb = ''" ><v-icon class="pt-1">close</v-icon></v-btn>
          </v-layout>
          <v-btn color="green lighten-3" class="sz4" v-if="parseInt(numb) > 0"><h2>{{total-parseInt(numb)}}</h2></v-btn>
        
        <v-divider></v-divider>
        <div class="new">
          <v-card class="calc" dark>
            <v-container>
              <v-layout row>
                <v-btn large @click="numb = numb + '1'">1</v-btn>
                <v-btn large @click="numb = numb +'2'">2</v-btn>
                <v-btn large @click="numb = numb +'3'">3</v-btn>
                <v-btn large @click="numb = parseInt(numb) + 10">+10</v-btn>
              </v-layout>
              <v-layout row :class="size">
                <v-btn large @click="numb = numb +'4'">4</v-btn>
                <v-btn large @click="numb = numb +'5'">5</v-btn>
                <v-btn large @click="numb = numb +'6'">6</v-btn>
                <v-btn large @click="numb = parseInt(numb) + 20">+20</v-btn>
              </v-layout>
              <v-layout :class="size">
                <v-btn large @click="numb = numb +'7'">7</v-btn>
                <v-btn large @click="numb = numb +'8'">8</v-btn>
                <v-btn large @click="numb = numb +'9'">9</v-btn>
                <v-btn large @click="numb = parseInt(numb) + 50">+50</v-btn>
              </v-layout>
              <v-layout :class="size">
                <v-btn large @click="numb = ''">C</v-btn>
                <v-btn large @click="numb = numb +'0'">0</v-btn>
                <v-btn large @click="numb = numb +'.'">.</v-btn>
                <v-btn large @click="numb = numb.slice(0, -1)">
                  <v-icon>arrow_left</v-icon>
                </v-btn>
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
 </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Checkout',
  components: {
    // Navigation
  },
  data: () => ({
    numb: '',
    closeState: false
  }),
  computed: {
    ...mapGetters(['products', 'shoppingCart', 'userData', 'subTotal', 'vat', 'total'])
  },
  methods: {
    async postData () {
      let proUrl = 'http://192.168.0.108/pos/api/order'
      let userData = this.userData
      let headerConfig = {
        headers: {
          'x-api-key': '123456',
          Authorization: userData.token
        }
      }
      let cart = this.shoppingCart.map(sp => {
        return {
          id: sp.id,
          name: sp.name,
          qty: sp.qty
        }
      })
      let orderDetails = {
        total: this.total,
        vat: this.vat,
        cash: this.numb,
        change: parseInt(this.numb) - this.total,
        cart: cart
      }
      await axios.post(proUrl, orderDetails, headerConfig)
        .then(res => {
          // console.log("product Data", res.data.data);
          let orderId = res.data.data
          this.$store.dispatch('clearCart')
          this.$router.push('/invoice/' + orderId)
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style>
.sz {
  width: 300px;
  height: 80px;
}
.sz1 {
  font-size: 45px;
}
.calc {
  padding-top: 20px;
  width: 470px;
  height: 320px;
}
.sz2 {
  width: 700px;
  height:40px;
}
.sz4 {
  width: 95px;
}
.sz5 {
  width:10px;
}
.gred {
  flex-direction: 'row'
}
.new {
  padding-top: 20px;
}
.new2 {
  font-size: 20px;
  padding-left: 30px;
}
.centr {
  text-align: center;
}
.rht {
  margin-left: auto;
  margin-right: 25px;
}
</style>
