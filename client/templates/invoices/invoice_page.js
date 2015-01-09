Template.invoicePage.events({
  "click .confirm-changes": function(e, t){
    e.preventDefault();

    Meteor.call('ciuExport', function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('invoicePage', {_id: result._id});
    });
  }
});

Template.invoicePage.helpers({
  invoiceLines: function(){
    return InvoiceLines.find({invoiceId: this._id}, {sort: {invoiceLineNumber: 1}});
  }
})
