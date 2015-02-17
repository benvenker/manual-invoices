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
    console.log("Server fired the vendorNames method!")

    return Manufacturers.findFaster({manufacturerName: {$regex: regex}, supplierSite: supplierSite}, options).fetch();
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
    console.log("Server fired the vendorNumbers method");
    return Manufacturers.findFaster({supplierSite: parseInt(query)}, {limit: 1}).fetch();
  }
});
