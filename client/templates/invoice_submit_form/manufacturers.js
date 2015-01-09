Template.manufacturers.helpers({
  manufacturers: function() {
    // TODO: add manufacturers collection

      var everything = Manufacturers.find({department: Session.get('department')},{sort: {manufacturer:1}}).fetch();
      var justManufacturers = _.pluck(everything,"manufacturer");
      return _.uniq(justManufacturers);
    }
});

Template.manufacturers.events({
  "change .manufacturer-selection": function(e, t){
    if (Session.get('department') > 0) {
      return Session.set("manufacturer", $("[name=manufacturers]").val());
    }
  }
});
