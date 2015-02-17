Template.vendorTypeahead.helpers({
  getVendorNumber: function(query, callback) {
    // since regex's can't match ints, wait until valid length is entered to query db.
    if (query.length === 7) {
      Meteor.call('vendorNumbers', query, {}, function (err, res) {
        if (err) {
          console.log(err);
          return;
        }
        callback(res.map(function (v) {
          return {value: v.supplierSite};
        }));
      });
    }
  },
  
  getVendorName: function(query, callback) {
    var supplierSite = Session.get("supplierSite");
    query = query.toUpperCase();

    Meteor.call('vendorNames', query, {}, supplierSite, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return {value: v.manufacturerName}; }));
    });
  }
});

Template.vendorTypeahead.events({
  "change .vendor-number": function(e, t){
    return Session.set("supplierSite", parseInt($("[name=vendor-number-search]").val()));
  }
});
