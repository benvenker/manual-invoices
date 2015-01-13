Template.invoicePage.events({
  "click .ciu-export": function(e, t){
    e.preventDefault();

    var invoice = this._id;

    Meteor.call('ciuExport', invoice, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('invoicePage', {_id: this._id});
    });
  }
});

Template.invoicePage.helpers({
  invoiceLines: function(){
    return InvoiceLines.find({invoiceId: this._id}, {sort: {invoiceLineNumber: 1}});
  }
})
