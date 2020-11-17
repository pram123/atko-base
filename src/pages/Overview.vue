<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bank text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Account Value</p>
              <h4 class="card-title">${{this.accountValue}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-paper-2 text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Number of accounts</p>
              <h4 class="card-title">{{this.numAccounts}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-money-coins text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Rate of return</p>
              <h4 class="card-title">{{this.rateofReturn}}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>



      </div>
      <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Account balance</h4>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Checking
                <i class="fa fa-circle text-danger"></i> Savings
                <i class="fa fa-circle text-warning"></i> Money Market 1
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Note:: This is just static content.
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <card>
            <template slot="header">
              <h5 class="title">Transactions</h5>
              <p class="category">Last 5 transactions</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>
              <template slot-scope="{row}">
                <td>{{row.title}}</td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">Transaction Summary</h4>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i>  Credits
                <i class="fa fa-circle text-danger"></i> Debits
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Account Breakdown</h4>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Checking
                <i class="fa fa-circle text-danger"></i> Savings
                <i class="fa fa-circle text-warning"></i> Money Market 1
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Note:: This is just static content
              </div>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import appConfig from '../.app.conf.js'
  import vmodal from 'vue-js-modal'
  import axios from 'axios'

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      crossDomain: true
    }
  };
  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    methods: {
      async getAccounts(){
        console.log("Get Accounts");
        let accountURL =appConfig.api.getAccounts + (await this.$auth.getUser()).sub;
        console.log("getAccounts:: Get accountsURl"+ accountURL);
        try {
          axios.get(accountURL,axiosConfig).then((response) => {
            this.accounts = response.data
            this.numAccounts = _.size(this.accounts.response);
          })
        } catch (e) {
          console.error(`Errors! ${e}`)
        }
      },

      async getTransactions(){
        console.log("Get Transactions");
        let tURL = appConfig.api.getTransactions + "/" + (await this.$auth.getUser()).sub;
        try {
          axios.get(tURL,axiosConfig).then((response) => {
            let transactions = response.data.response;
            console.log("Transactions::", transactions);
            var output =
                _(transactions)
                    .groupBy('transType')
                    .map((objs, key) => ({
                      'transType': key,
                      'amount': _.sumBy(objs, 'amount') }))
                    .value();
            console.log("output::", output);
            let cr =new Object();
            let db = new Object();
             cr.amount=0;
             db.amount = 0;
             cr =_.find(output, function(o) { return o.transType === 'CR'; });
             db =_.find(output, function(o) { return o.transType === 'DB'; });
            this.accountValue = cr.amount - db.amount;
            console.log("Account Value:: CR", cr);
            var format = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            });

            // lets update the TransactionTable
            var i;
            for (i = 0; i != 6; i++) {
              let tmp = {};
               tmp.title = transactions[i].transType + ":" + transactions[i].fromAccount + " to " +
                  transactions[i].toAccount +" for " + format.format(transactions[i].amount);
              this.tableData.data.push(tmp);
            }

          })
        } catch (e) {
          console.error(`Errors! ${e}`)
        }
      },
    },
    mounted() {
      console.log("Mounted!");
       this.getAccounts();
      this.getTransactions();

    },
    data () {
      return {
        accountValue: 0,
        numAccounts:0,
        rateofReturn:0.1,
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pieChart: {
          data: {
            labels: ['40%', '20%', '40%'],
            series: [40, 20, 40]
          }
        },
        lineChart: {
          data: {
            labels: ['1/31', '2/28', '3/31', '4/30', '5/31', '6/30', '7/31', '8/30'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: '' }
          ]
        }
      }
    }
  }
</script>
<style>

</style>
