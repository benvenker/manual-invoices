Template.approvedInvoicePage.events({
  // Export the invoice in CIU format
  "click .approve-invoice": function(e, t) {
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
        Bert.alert("Export successful", "success");
        Router.go('invoicesList', {_id: this._id});
      });

      var approvalAttributes = {
        exported: true,
        exportedDate: new Date(),
        status: 'approved',
        approvedDate: new Date(),
        approvedBy: approver.emails[0].address,
        pending: false
      };
      console.log("invoice to update: " + invoice);
      Invoices.update(invoice, {$set: approvalAttributes});
    }
    return false;
  },

  'click .reject-invoice': function(e) {
    e.preventDefault();
    if (confirm("Reject this invoice? This will send it to the Rejected queue for review.")) {
      var approver = Meteor.user();

      Invoices.update({_id: this._id},
        {$set:
          {
            status: 'rejected',
            rejectedBy: approver.profile.firstName + ' ' + approver.profile.lastName || approver.emails[0].address
          }
        });
      alert("Invoice moved to the Rejected queue");
      Router.go('invoicesList');
    }
  }

  // If you're in the 'create-invoices' role, submit the invoice for approval
  //"click .submit-invoice": function(e, t) {
  //  e.preventDefault();
  //
  //  if (confirm("Are you sure you want to submit this invoice?")) {
  //    var invoice = this._id;
  //    console.log("invoice: " + invoice);
  //    var author = Meteor.user().emails[0].address;
  //    Invoices.update(invoice, {$set: {
  //      pending: true,
  //      submitted: new Date(),
  //      author: author,
  //      approved: true}
  //    });
  //  }
  //}
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
