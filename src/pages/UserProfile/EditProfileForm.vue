
<template>
  <div v-if="dataReady">

  <card>
    <h4 slot="header" class="card-title">My Profile</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Company"
                    :disabled="true"
                    placeholder="Light dashboard"
                    v-model="user.company">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="user.preferred_username">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="First Name"
                    placeholder="First Name"
                    v-model="user.given_name">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="user.family_name">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input type="text"
                    label="Address"
                    placeholder="Home Address"
                    v-model="user.address.street_address">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input type="text"
                    label="City"
                    placeholder="City"
                    v-model="user.address.region">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="Country"
                    placeholder="Country"
                    v-model="user.address.country">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="number"
                    label="Postal Code"
                    placeholder="ZIP Code"
                    v-model="user.address.postal_code">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>About Me</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="Here can be your description"
                      v-model="user.aboutMe">
              </textarea>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Profile
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import APIFunctions from '@/assets/js/APIRequests.js'

  let userInfo = new Object();
  let user = new Object();
  export default {
    components: {
      Card,
      APIFunctions
    },
    data () {
      return {
        dataReady: false,
      }
    },
    watch: {
      'userInfo': {
        handler: function(val) { console.log('changed,', userInfo) },
        deep: true
      }
    },
    async mounted() {
      console.log("Came to mounted");
       this.userInfo = await  APIFunctions.getUserAttribute();
       this.user = this.userInfo;
      console.log("userinfo = ", this.userInfo)
      console.log("ended to mounted");
      this.dataReady = true;
    },
    methods: {
    }
  }

</script>
<style>

</style>
