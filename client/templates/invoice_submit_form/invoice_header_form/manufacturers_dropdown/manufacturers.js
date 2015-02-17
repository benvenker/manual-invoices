Template.manufacturers.helpers({
  manufacturers: function() {
    var everything = Manufacturers.findFaster({department: Session.get('department'), manufacturerName: Session.get('vendorName')},{sort: {manufacturer:1}}).fetch();
    var justManufacturers = _.pluck(everything,"manufacturer");
    return _.uniq(justManufacturers);
  }
});

Template.manufacturers.events({
  "change .typeahead": function(e, t){
    return Session.set("manufacturer", $("[name=search]").val());
  }
});
