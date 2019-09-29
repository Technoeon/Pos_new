<template>
  <v-app>
    <v-toolbar app v-if="userData">
      <v-toolbar-title class="headline text-uppercase" v-if="userData">
        <router-link
        to='/'
        tag='span'
        style='cursor: pointer'>
        Cafe Gloria
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <!-- <v-text-field
          label='Movie Name'
          v-model='searchString'
          >
        </v-text-field> -->
        </v-flex>
      <v-btn text to="/checkout">
        <v-badge left color="green">
          <span slot="badge" v-if="shoppingCart.length > 0">{{shoppingCart.length}}</span>
        <v-icon>mdi-cart</v-icon>Basket
        </v-badge>
       </v-btn>
      <v-btn
        flat
        @click="logout"
      >
       <span class="mr-2">Logout</span>
      </v-btn>
    </v-toolbar>

    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchMovie () {
      this.$router.push('/search/' + this.searchString)
      this.searchString = ''
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.go({ path: '/' })
    }
  },
  computed: {
    ...mapGetters(['userData', 'shoppingCart']),
    dataAvailable () {
      return this.searchString !== null && this.searchString !== ''
    }
  }
}
</script>
