/*!
* Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
* The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
*
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*
* See the License for the specific language governing permissions and limitations under the License.
*/

<template>
      <div class="content">
        <div class="container-fluid">
          <card>
            <div class="row">
              <div class="col-md-6">
                <h5>Select option:</h5>
              </div>
            </div>
          </card>

          <div class="all-icons">
            <div class="row">
              <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="font-icon-detail">
                  <i class="nc-icon nc-attach-87"></i>
                  <a href="/loginWidgetDev"><p>Login to dev</p></a>
                </div>
              </div>

              <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="font-icon-detail">
                  <i class="nc-icon nc-attach-87"></i>
                  <a href="/loginWidgetProd"><p>Login to prod</p></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
    import OktaSignIn from '@okta/okta-signin-widget'
    import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

    import oktaConfig from '../../.okta.conf.js'

    export default {
        name: 'Login',
    }
</script>