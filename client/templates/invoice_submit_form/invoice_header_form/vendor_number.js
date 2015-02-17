/**
 * Created by Ben on 1/13/15.
 */
Template.vendorNumbers.helpers({
  // vendorNumbers: function() {
  //   // TODO: Probably need to make a new collection that has vendor names + dept. mfg.
  //   var everything = Manufacturers.findFaster({
  //     manufacturerName: Session.get('vendorName')
  //     //department: parseInt(Session.get('department')),
  //     //manufacturer: parseInt(Session.get('manufacturer'))
  //   }, {sort: {supplierSite:1}}).fetch();
  //   var justVendorNumber = _.pluck(everything,"supplierSite");
  //
  //   return _.uniq(justVendorNumber);
  // }

  // search: function(query, callback) {
  //   Meteor.call('vendorNumbers', query, {}, function(err, res) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     callback(res.map(function(v){ return {value: v.supplierSite}; }));
  //     console.log("Client fired the vendorNumbers method.")
  //   });
  // }
});

// Template.vendorNumbers.events({
//   "change .vendor-number-selection": function(e, t){
//     return Session.set("vendorNumber", $("[name=vendorNumbers]").val());
//   }
// });

// Template.vendorNumbers.rendered = function(){
//   Meteor.typeahead.inject();
//   console.log("vendorNumbers typeahead injected!")
// }
