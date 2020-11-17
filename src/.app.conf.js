let baseAPIURL= "/api/";

export default {
    api: {

        createNewAccount: baseAPIURL + "/v1/accounts/account/",
        deleteAccount: baseAPIURL +  "/v1/accounts/account/",
        getAccounts: baseAPIURL + "/v1/accounts/",
        getTransactions: baseAPIURL + "/v1/transactions/",
        getTransaction:baseAPIURL + "/v1/transactions/transaction/",
        createTransaction: baseAPIURL + "/v1/transactions/transaction/"

    }
}