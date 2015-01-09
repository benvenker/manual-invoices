Template.manufacturers.helpers({
  manufacturers: function() {
    var everything = Manufacturers.find({department: parseInt(Session.get('department'))}, {sort: {manufacturer:1}}).fetch();
    var justManufacturers = _.pluck(everything,"manufacturer");
    return _.uniq(justManufacturers);
  }
});

Template.manufacturers.events({
  "change .manufacturer-selection": function(e, t){
    return Session.set("manufacturer", $("[name=manufacturers]").val());
  }
});
