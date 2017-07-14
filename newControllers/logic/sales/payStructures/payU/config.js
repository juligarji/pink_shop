
var dataRequired = {
    merchantId : process.env.PAYU_MERCHAND_ID || 508029,
    accountId : process.env.PAYU_ACCOUNT_ID || 512321,
    apiKey : process.env.PAYU_API_KEY || '4Vj8eK4rloUd272L48hsrarnUA',
    handleAddress : '/sales/recievebypayu',
}

module.exports = dataRequired;
