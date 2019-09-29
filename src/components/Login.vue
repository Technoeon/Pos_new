<template>
  <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Cafe Gloria Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      wholeResponse: [],
      loading: false,
      email: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    async login () {
      const rootURL = 'http://192.168.0.108/pos/api/'
      let loginUrl = rootURL + 'user/login'
      let headerConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '123456'
        }
      }
      let user = {
        user: this.email,
        password: this.password
      }
      await axios
        .post(loginUrl, user, headerConfig)
        .then(res => {
          let proUrl = 'http://192.168.0.108/pos/api/product'
          let userData = res.data.data
          // console.log(userData.token)
          this.$store.dispatch('loadUserData', userData)
          let headerConfigProduct = {
            headers: {
              'x-api-key': '123456',
              'Authorization': userData.token
            }
          };
          axios
            .get(proUrl, headerConfigProduct)
            .then(res => {
              let productData = res.data.data
              this.$store.dispatch('loadProduct', productData)
              this.$router.go({ path: '/home' })
            })
            .catch(err => {
              alert(err)
            })
        })
        .catch(err => {
          alert(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
