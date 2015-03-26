Meteor.methods({
  vendorNames: function(query, options, supplierSite) {
    if (!query) return [];

    options = options || {};

    // guard against client-side DOS: hard limit to 50
    if (options.limit) {
      options.limit = Math.min(50, Math.abs(options.limit));
    } else {
      options.limit = 10;
    }

    //// TODO fix regexp to support multiple tokens
    var regex = new RegExp("^" + query);
    return Suppliers.findFaster({vendorNumber: supplierSite}, options).fetch();
  },

  'vendorNumbers': function(query, options) {
    if (!query) return [];

    options = options || {};

    // guard against client-side DOS: hard limit to 50
    if (options.limit) {
      options.limit = Math.min(50, Math.abs(options.limit));
    } else {
      options.limit = 10;
    }

    //// TODO fix regexp to support multiple tokens
    return Manufacturers.findFaster({supplierSite: parseInt(query)}, {limit: 1}).fetch();
  },

  'departments': function(query, options) {
    if (!query) return [];

    options = options || {};

    // guard against client-side DOS: hard limit to 50
    if (options.limit){
      options.limit = Math.min(50, Math.abs(options.limit));
    } else {
      options.limit = 10;
    }
    return Manufacturers.findFaster({department: parseInt(query)}, {limit: 1}).fetch();
  },

  'deleteInvoiceLine': function(invoice, line, department) {
    if (!invoice || !line) {
      console.log("no invoice information provided!")
    } else {
      //var originalLines = countLines();
      console.log("_id: " + invoice);
      console.log("line: " + line);
      console.log("about to delete the invoice line...");
      Invoices.update(
        {_id: invoice},  // find the right invoice
        {$pull: {'lines.line': line}} // delete the line
        //{$pull: {department: department}}
      );
      //var updatedLines = countLines();

    //if (updatedLines == originalLines - 1 ) {
      console.log("deleted!");
    //} else {
    //  console.log("something went wrong...")

    }
  }
});
