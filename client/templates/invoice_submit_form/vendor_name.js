// Template.vendorNames.rendered = function(){
//   $('.dropdown-toggle').dropdown();
//   Session.get("department");
// }

Template.vendorNames.helpers({
  vendorNames: function() {
    // TODO: Probably need to make a new collection that has vendor names + dept. mfg.
    var everything = Manufacturers.find({department: parseInt(Session.get('department'))}, {manufacturer: parseInt(Session.get('manufacturer'))}, {sort: {manufacturerName:1}}).fetch();
    var justVendors = _.pluck(everything,"manufacturerName");
    return _.uniq(justVendors);
  }
});

Template.vendorNames.events({
  "change .vendor-name-selection": function(e, t){
    return Session.set("vendorName", $("[name=vendorNames]").val());
  }
});