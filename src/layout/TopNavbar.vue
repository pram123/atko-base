<template>
  <nav class="navbar navbar-expand-lg">


    <div class="container-fluid">
      <a class="navbar-brand" href="#">Dashboard</a>
     <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
           <!--  <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a> -->
          </li>
          <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">3</span>
            </template>
            <a class="dropdown-item" href="#">New Account Created</a>
            <a class="dropdown-item" href="#">Paid AMEX</a>
            <a class="dropdown-item" href="#">Got Paid! Congrats! 3</a>

          </base-dropdown>

          <base-dropdown title="Account Actions" @select="accountSelect">
            <a class="dropdown-item"  href="#" @click="accountSelect('addChecking')">Add Checking Account</a>
            <a class="dropdown-item" href="#" @click="accountSelect('addSavings')">Add Savings Account</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#" @click="accountSelect('addAMEX')">Add AMEX Card</a>
            <a class="dropdown-item" href="#" @click="accountSelect('addCITI')">Add Citi Card</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#" @click="transferSelect('transfer100')">Transfer $100 from Checking to Savings</a>
            <a class="dropdown-item" href="#" @click="transferSelect('transfer525')">Transfer $525 from Savings to Checking</a>
            <a class="dropdown-item" href="#" @click="transferSelect('transfer5403CheckAMEX')">Transfer $5403 from Checking to AMEX</a>
            <a class="dropdown-item" href="#" @click="transferSelect('transfer73635CheckAMEX')">Deposit $736.35 to Savings</a>
            <a class="dropdown-item" href="#" @click="transferSelect('DepositPaycheck')">Deposit paycheck ($48929.35) to Checking</a>

            <div class="divider"></div>
          </base-dropdown>
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li> -->
        </ul>
        <ul class="navbar-nav ml-1">
         <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              Account
            </a>
          </li> -->


          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout()">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>

import apiFunctions from '@/assets/js/APIRequests.js'
import apiURL from '@/.app.conf.js'

  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false,
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
      }
    },
    methods: {
      async logout(){
        this.notifyVue('top','center','Logging out. Thank you for your business');
        await this.$auth.logout()
        window.location.href="/";
        console.log("Logging out..");

      },
      notifyVue (verticalAlign, horizontalAlign, msg) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
            {
              message: `<span>`+ msg + `</span>`,
              icon: 'nc-icon nc-app',
              horizontalAlign: horizontalAlign,
              verticalAlign: verticalAlign,
              type: this.type[color]
            })
      },
      async transferSelect(string){
        console.log("Transfer..", string);
        let body = new Object();
        if (string === 'transfer100') {
          body.amount = 100,
              body.fromAccount = "Checking",
              body.id = -1,
              body.tDate = new Date().toLocaleDateString(),
              body.tMetaData = "",
              body.toAccount = 'Savings',
              body.transType = 'DB',
              body.userID = (await this.$auth.getUser()).sub;
          this.notifyVue('top','center','Debit $100 from Checking to Savings')

          await apiFunctions.sendRequest(body, apiURL.api.createTransaction);

        } else if (string === 'transfer525') {
            body.amount= 525,
            body.fromAccount= "Savings",
            body.id= -1,
            body.tDate= new Date().toLocaleDateString(),
            body.tMetaData= "",
            body.toAccount= 'Checking',
            body.transType= 'CR',
            body.userID=(await this.$auth.getUser()).sub;
            await apiFunctions.sendRequest(body,apiURL.api.createTransaction);
          this.notifyVue('top','center','Credit $525 from Savings to Checking')

        } else if (string === 'transfer5403CheckAMEX') {
          body.amount= 54.03,
              body.fromAccount= "Checking",
              body.id= -1,
              body.tDate= new Date().toLocaleDateString(),
              body.tMetaData= "",
              body.toAccount= 'AMEX',
              body.transType= 'CR',
              body.userID=(await this.$auth.getUser()).sub;
          await apiFunctions.sendRequest(body,apiURL.api.createTransaction);
          this.notifyVue('top','center','Debit 54.03 from Checking to AMEX')

        } else if (string === 'transfer173635CheckAMEX') {
          body.amount = 1736.35,
              body.fromAccount = "Checking",
              body.id = -1,
              body.tDate = new Date().toLocaleDateString(),
              body.tMetaData = "",
              body.toAccount = 'AMEX',
              body.transType = 'CR',
              body.userID = (await this.$auth.getUser()).sub;
          await apiFunctions.sendRequest(body, apiURL.api.createTransaction);
          this.notifyVue('top','center','Debit $1736.35, from Checking to AMEX')

        } else if (string === 'DepositPaycheck') {
             body.amount = 48929.35,
              body.fromAccount = "Corp1 Paycheck",
              body.id = -1,
              body.tDate = new Date().toLocaleDateString(),
              body.tMetaData = "",
              body.toAccount = 'Checking',
              body.transType = 'CR',
              body.userID = (await this.$auth.getUser()).sub;
          await apiFunctions.sendRequest(body, apiURL.api.createTransaction);
          this.notifyVue('top','center','Credit $48929.35, from paycheck to Checking')

        }

      },

      async accountSelect(string){
        console.log("Came here..", string);
        let msg = "";
        let body = new Object();
        if (string === 'addChecking'){
          body.id = -1;
          body.accountAccess = "RW";
          body.userID = (await this.$auth.getUser()).sub
          body.accountID = "Checking " + Math.floor(Math.random() * 100);
          await apiFunctions.sendRequest(body,apiURL.api.createNewAccount);
          msg = "Created Checking account"
        } else if (string === "addSavings"){
          body.id = -1;
          body.accountAccess = "RW";
          body.userID = (await this.$auth.getUser()).sub
          body.accountID = "Savings " + Math.floor(Math.random() * 100);
          await apiFunctions.sendRequest(body,apiURL.api.createNewAccount);
          msg = "Created Savings account"

        } else if (string === "addAMEX"){
          body.id = -1;
          body.accountAccess = "RW";
          body.userID = (await this.$auth.getUser()).sub
          body.accountID = "CitiBank " + Math.floor(Math.random() * 100);
          await apiFunctions.sendRequest(body,apiURL.api.createNewAccount);
          msg = "Added AMEX  Credit Card"

        } else if (string === "addCITI") {
          body.id = -1;
          body.accountAccess = "RW";
          body.userID = (await this.$auth.getUser()).sub
          body.accountID = "AMEX " + Math.floor(Math.random() * 100);
          await apiFunctions.sendRequest(body, apiURL.api.createNewAccount);
          msg = "Added Citi Card"
        }
        this.notifyVue('top','center',msg)

      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
