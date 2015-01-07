Template.manufacturers.helpers({
  manufacturers: function() {
    // TODO: add manufacturers collection
    var everything = Suppliers.find({department: parseInt(Session.get('department'))}, {sort: {manufacturer:1}}).fetch();
    var justManufacturers = _.pluck(everything,"manufacturer");
    return _.uniq(justManufacturers);
  }
});

Template.manufacturers.events({
  "change .department-selection": function(e, t){
    return Session.set("manufacturer", $("[name=manufacturer]").val());
  }
});
