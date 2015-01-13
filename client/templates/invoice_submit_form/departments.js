Template.departments.created = function() {
  this.autorun(function() {
    // Meteor.subscribe('manufactu');
  })
}


Template.departments.helpers({
  departments: function() {
    var departmentNums = Manufacturers.findFaster({manufacturerName: Session.get('vendorName')}, {sort: {department:1}}).fetch();
    var justDepartments = _.pluck(departmentNums, 'department');
    return _.uniq(justDepartments);
  }
});

Template.departments.events({
  "change .department-selection": function(e, t){
    return Session.set("department", parseInt($("[name=departments]").val()));
  }
});
