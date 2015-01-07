// Create Admin and Support accounts if there are no accounts in collection
if(Meteor.users.find().count < 1) {
  var users = [
      {name:'Customer Service', email:'cs@home.com',roles:['view-invoices','view-users']},
      {name:'Admin Super User', email:'bvemails@daugherty.com',roles:['admin']}
  ];
_.each(users, function(user){
  var userid = Accounts.createUser({
    email: user.email,
    password: 'password',
    username: user.email,
    profile:{name: user.name}
  });
  Meteor.users.update({_id: userid},{$set: {'emails.0.verified': true}});
  Roles.addUsersToRoles(userid, user.roles);
});
}
