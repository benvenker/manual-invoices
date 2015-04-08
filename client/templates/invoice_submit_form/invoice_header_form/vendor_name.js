Template.vendorNames.helpers({
  vendorNames: function() {
    var everything = Manufacturers.findFaster({}, {sort: {manufacturerName:1}}).fetch();
    var justManufacturerNames = _.pluck(everything,"manufacturerName");
    return _.uniq(justManufacturerNames);
  }
});

Template.vendorNames.events({
  "change .vendor-name-selection": function(e, t){
    return Session.set("vendorName", $("[name=vendorNames]").val());
  }
});