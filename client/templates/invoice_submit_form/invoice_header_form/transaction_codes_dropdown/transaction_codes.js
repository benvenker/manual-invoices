Template.transactionCodes.created = function() {
  this.autorun(function() {
    subs.subscribe('transactionCodes');
  })
}

Template.transactionCodes.helpers({
  transactionCodes: function() {
    //var everything = TransactionCodes.find({banner: parseInt(Session.get('opco'))}, {sort: {transactionCode:1}}).fetch();
    //var justTransactionCodes = _.pluck(everything,"transactionCode");
    //return _.uniq(justTransactionCodes);

    return TransactionCodes.findFaster({$or: [
      {banner: parseInt(Session.get('opco'))},
      {banner: "NA"}
    ]
    }, {sort: {transactionCode:1}}).fetch();
  }
});

Template.transactionCodes.events({
  "change .transactionCode-selection": function(e, t){
    return Session.set("transactionCode", $("[name=transactionCode]").val().substr(0,3));
  }
});
