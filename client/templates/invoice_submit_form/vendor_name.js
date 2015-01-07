// Template.vendorNames.rendered = function(){
//   $('.dropdown-toggle').dropdown();
//   Session.get("department");
// }

Template.vendorNames.helpers({
  vendorNames: function() {
    // TODO: Probably need to make a new collection that has vendor names + dept. mfg.
    var everything = Suppliers.find({department: parseInt(Session.get('department'))}, {sort: {vndrLongNm:1}}).fetch();
    var justVendors = _.pluck(everything,"vndrLongNm");
    return _.uniq(justVendors);
  }
});

Template.vendorNames.events({
  "change .vendor-name-selection": function(e, t){
    return Session.set("vendorName", $("[name=vendorNames]").val());
  }
});
