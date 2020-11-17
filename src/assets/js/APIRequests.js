
import axios from 'axios';
import resourceConfig from '../../.okta.conf.js'
import Auth from '@okta/okta-vue'
import Vue from 'vue'


let globalAxios = "";
import oktaConfig from '../../.okta.conf.js'
import apiEndpoints from '../../.app.conf.js'

Vue.use(Auth, oktaConfig.oidc)

globalAxios = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
});

export default {
    mounted(){
        console.log("functions mounted!");
        this.getUserProfile();
    },
    getUserProfile() {
        if (!(localStorage.getItem("userProfile"))) {
            // lets set the user Profile
            globalAxios = axios.create({
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken
                }
            });
            globalAxios.get(resourceConfig.oidc.issuer + "/v1/userinfo")
                .then(response => {
                    localStorage.setItem("userProfile", JSON.stringify(response))
                    console.log("userinfo Response = ", response)
                })
                .catch((error) => {
                    console.log("getUserAttribute Error = ", error);
                });
        } else {
            console.log("LocalStorage is set with userProfile");
        }
    },
    getUserAttribute: async function () {
        console.log("Getting data");
        let tmp = await Vue.prototype.$auth.getUser();//this.Auth.getUserProfile(); //(localStorage.getItem("idToken"));
        console.log("tmp = ", tmp);
        return tmp;

    },
    createUserName: function(uname){
        let createUserURL = serviceURL+"/user/create/createUserName"
        axios.post(createUserURL, { username: uname })
            .then(function(response){
                console.log('saved successfully. User details:', response);
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    },
    uploadProofPics: function (uname, base64Front, base64Back){
        let createUserURL = serviceURL+"/user/create/uploadPhotos"
        console.log("Uploading proof pics");
        axios.post(createUserURL, { username: uname,  frontLicense: base64Front, backLicense: base64Back })
            .then(function(response){
                console.log('saved successfully. User details:', response);
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    },
    createHYPRPin: function (uname, pin){
        let setupHYPRPin = serviceURL+"/user/create/HYPRPin"
        axios.post(setupHYPRPin, { username: uname,  hyprPin:pin })
            .then(function(response){
                console.log('HYPR pin configured', response);
            })
            .catch(function (response) {
                //handle error
                alert(response);
            });
    },
    sendRequest: function (body,url){
            console.log("Body::", body);
            console.log("url:", url);
        globalAxios.post(url,body,globalAxios)
            .then(response => {

                console.log("post response = ", response)
            })
            .catch((error) => {
                console.log("post Error = ", error);
            });
    },
    getMyAccountBalance: function(){
        return -100;
    },
    getMyAvailableCredit:function(){
        return "20,000";
    },
    getAmtDueToday:function(){
        return 100;
    },
}