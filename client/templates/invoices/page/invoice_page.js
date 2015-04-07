Template.invoicePage.rendered = function() {
  var _id = $('.grid-form.invoice').attr('id');
  var invoiceStatus = Invoices.findOne({_id: _id}).status;
  Session.set('invoiceStatus', invoiceStatus);
  console.log("status = " + invoiceStatus);
};


Template.invoicePage.events({
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
    if ($('.comment').val().length === 0) {
      alert("You must provide a comment if you are rejecting an invoice!");
    } else if (confirm("Reject this invoice? This will send it to the Rejected queue for review.")) {
      var approver = Meteor.user();
      console.log("rejected by: " + approver.profile.firstName + ' ' + approver.profile.lastName);
      console.log("rejector email: " + approver.emails[0].address);
      Invoices.update({_id: this._id},
        {$set:
          {
            status: 'rejected',
            rejectedBy: approver.profile.firstName + ' ' + approver.profile.lastName || approver.emails[0].address
          }
        });

      var comment = {
        userId: Meteor.user()._id,
        author: Meteor.user().emails[0].address,
        invoiceId: this._id,
        body: $('.comment').val()
      };

      Comments.insert(comment)
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
  },

  comments: function() {
    return Comments.find({invoiceId: this._id});
  },

  pending: function() {
    if (this.status === 'pending') {
      return true;
    } else {
      return false;
    }
  },

  approved: function() {
    if (this.status === 'approved') {
      return true;
    } else {
      return false;
    }
  },

  rejected: function() {
    if (this.status === 'rejected') {
      return true;
    } else {
      return false;
    }
  }
});
