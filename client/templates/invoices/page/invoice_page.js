Template.invoicePage.events({
  // Export the invoice in CIU format
  "click .ciu-export": function(e, t) {
    e.preventDefault();

    if (confirm("Are you sure you want to approve? \nThis will generate a CIU file to the LAN and cannot be undone.")) {
      // Checking the data to why chrome says ID is not being passed
      var data = Router.current().data();
      console.log(data);

      var invoice = this._id;
      var approver = Meteor.user();

      Meteor.call('ciuExport', invoice, function (error, result) {
        if (error)
          return alert(error.reason);
        Router.go('invoicesList', {_id: this._id});
      });
      Invoices.update(invoice, {$set: {
        exported: true,
        exportedDate: new Date(),
        approved: true,
        approvedDate: new Date(),
        approvedBy: approver,
        pending: false
      }});

    }
    return false;
  },

  // Change invoice approval flag to 'true'
  "click .approve-invoice": function(e, t) {
    e.preventDefault();

    if (confirm("Are you sure you want to approve this invoice?")) {
      var invoice = this._id;
      var approver = Meteor.user();
      Invoices.update(invoice, {$set: {
        approved: true,
        approvedDate: new Date(),
        approvedBy: approver}
      });
    }
  },

  // If you're in the 'create-invoices' role, submit the invoice for approval
  "click .submit-invoice": function(e, t) {
    e.preventDefault();

    if (confirm("Are you sure you want to submit this invoice?")) {
      var invoice = this._id;
      console.log("invoice: " + invoice);
      var author = Meteor.user().emails[0].address;
      Invoices.update(invoice, {$set: {
        pending: true,
        submitted: new Date(),
        author: author}
      });
    }
  }
});

Template.invoicePage.helpers({
  invoiceLines: function(){
    return InvoiceLines.find({invoiceId: this._id}, {sort: {invoiceLineNumber: 1}});
  }

  //invoiceLines: function() {
  //  var self = Invoices.find({_id: this._id}, {sort: {invoiceLineNumber: 1}}).fetch();
  //  console.log(self[0].lines);
  //  return self[0].lines;
  //}
});
