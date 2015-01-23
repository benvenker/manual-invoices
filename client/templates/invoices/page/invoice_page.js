Template.invoicePage.events({
  "click .ciu-export": function(e, t) {
    e.preventDefault();

    if (confirm("Are you sure you want to export? \nThis will generate a CIU file to the LAN and cannot be undone.")) {
      // Checking the data to why chrome says ID is not being passed
      var data = Router.current().data();
      console.log(data);

      var invoice = this._id;

      Meteor.call('ciuExport', invoice, function (error, result) {
        if (error)
          return alert(error.reason);
        Router.go('invoicesList', {_id: this._id});
      });
    }
    return false;
  }
});

Template.invoicePage.helpers({
  invoiceLines: function(){
    return InvoiceLines.find({invoiceId: this._id}, {sort: {invoiceLineNumber: 1}});
  }
})
