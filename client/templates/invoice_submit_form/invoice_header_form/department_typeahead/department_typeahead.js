Template.departmentTypeahead.helpers({
  'getDepartments': function(query, callback) {
    Meteor.call('departments', query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return { value: v.department}; }));
      console.log("Client fired the department typeahead method");
    });
  }
});