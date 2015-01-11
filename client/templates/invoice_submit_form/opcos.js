Template.opcos.helpers({
  // opcos: function() {
  //   var everything = Suppliers.find({}, {sort: {department:1}}).fetch();
  //   var justOPCOs = _.pluck(everything,"OPCO");
  //   return _.uniq(justOPCOs);
  // }
});

Template.opcos.events({
  "change .opco-selection": function(e, t){
    return Session.set("opco", $("[name=OPCOs]").val());
  }
});
