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
  if (transactionCodeObj[0].banner == "NA") {
    var glAccount = transactionCodeObj[0].account;
    glAccount = glAccount.replace("XX", "0" + banner);
    glAccount = glAccount.replace("0XXX", store);
    return glAccount;
  } else {
      console.log("banner: " + transactionCodeObj[0].banner);
      return transactionCodeObj[0].account;
  }
};