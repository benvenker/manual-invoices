Template.departments.helpers({
  departments: function() {
    var everything = Suppliers.find({OPCO: parseInt(Session.get('opco'))}, {sort: {department:1}}).fetch();
    var justDepartments = _.pluck(everything,"department");
    return _.uniq(justDepartments);
  }
});

Template.departments.events({
  "change .department-selection": function(e, t){
    return Session.set("department", parseInt($("[name=departments]").val()));
  }
});
