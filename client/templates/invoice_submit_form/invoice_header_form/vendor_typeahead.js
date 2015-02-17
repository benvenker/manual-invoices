Template.vendorTypeahead.helpers({
  getVendorNumber: function(query, callback) {
    Meteor.call('vendorNumbers', query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return {value: v.supplierSite}; }));
      console.log("Client fired the search (vendorNumbers) method.")
    });
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
      console.log("Client fired the search-fast (vendorName) method...")
    });
  }
});

Template.vendorTypeahead.events({
  "change .vendor-number": function(e, t){
    return Session.set("supplierSite", parseInt($("[name=vendor-number-search]").val()));
  }
});

Template.vendorTypeahead.rendered = function(){
  Meteor.typeahead.inject();
  console.log("typeahead vendorTypeahead injected!");
}
