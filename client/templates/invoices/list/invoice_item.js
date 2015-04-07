Template.invoiceItem.helpers({
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
      console.log("rejected: true");
      return true;
    } else {
      return false;
    }
  }
});