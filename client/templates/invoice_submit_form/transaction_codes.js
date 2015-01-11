Template.transactionCodes.created = function() {
  this.autorun(function() {
    Meteor.subscribe('transactionCodes');
  })
}

Template.transactionCodes.helpers({
  transactionCodes: function() {
    var everything = TransactionCodes.find({banner: parseInt(Session.get('opco'))}, {sort: {transactionCode:1}}).fetch();
    var justTransactionCodes = _.pluck(everything,"transactionCode");
    return _.uniq(justTransactionCodes);
  }
});

Template.transactionCodes.events({
  "change .transactionCode-selection": function(e, t){
    return Session.set("transactionCode", $("[name=transactionCodes]").val());
  }
});
