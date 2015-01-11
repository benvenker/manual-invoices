Template.departments.created = function() {
  this.autorun(function() {
    Meteor.subscribe('departments');
  })
}


Template.departments.helpers({
  departments: function() {
    var departmentNums = Departments.find().fetch();
    var justDepartments = _.pluck(departmentNums, 'department');
    return _.uniq(justDepartments);
  }
});

Template.departments.events({
  "change .department-selection": function(e, t){
    return Session.set("department", parseInt($("[name=departments]").val()));
  }
});
