getTransactionCodeObject = function(transactionCode, banner) {
  if (!banner) { // if banner is not provided, return corporate account
    return TransactionCodes.find({transactionCode: transactionCode}).fetch();
  } else {
    return TransactionCodes.find({ // Get a TransactionCode object
      transactionCode: transactionCode,
      banner: banner
    }, {fields: {transactionCode: 1, account: 1}}).fetch();
  }
};

getGlAccount = function(transactionCodeObj) {
  if (!transactionCodeObj) {
    return "Please provide a transaction code";
  } else {
    return _.pluck(transactionCodeObj, "account");
  }
};

completeGlAccount = function(transactionCodeObj, store, banner ) {
  var glAccount = transactionCodeObj.account;
  if (transactionCodeObj.banner == "NA") {
    //var glAccount = transactionCodeObj.account;
    console.log("GL Account from transactionCodeObj: " + glAccount);
    glAccount = glAccount.replace("XX", "0" + banner).replace("0XXX", store);
    console.log("completeGlAccount account: " + glAccount);
    return glAccount;
  } else {
      console.log("banner: " + transactionCodeObj.banner);
      return glAccount;
  }
};