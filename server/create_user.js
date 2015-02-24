Meteor.startup(function() {
  // var users = [
  //   {
  //     name: "Joy Rutlidge",
  //     emails: [{ address: "joy.rutlidge@saks5inc.com", verified: true}]},
  //
  //   {
  //     name: "Beth Busbea",
  //     emails:[ {address: "beth.busbea@saks5_inc.com", verified: true}]},
  //   {
  //     name: "Kim Cooper",
  //     emails: [ {address: "kim.cooper@partners.hbc.ca", verified: true}]}
  // ];

  
});

Meteor.methods({
  'createUserWithRole': function(data, role) {
    var userId;

    Meteor.call('createUserNoRole', data, function(err, result) {
      if (err) {
        console.log(err.message);
        return err;
      }
      Roles.addUsersToRoles(result, role);
      return userId = result;
    });
    //return userId;
  },
  'createUserNoRole': function(data) {
    //Do server side validation
    return Accounts.createUser({
      email: data.email,
      password: data.password,
      profile: data.profile
    });
  }
});
