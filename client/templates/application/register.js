Template.register.events({
  'submit form': function(event, template){
    event.preventDefault();
    var emailVar = template.find('#register-email').value;
    var passwordVar = template.find('#register-password').value;
    var users = [];
    var userid = Accounts.createUser({
          email: emailVar,
          password: passwordVar,
    });
    Meteor.users.update({_id: userid}, {$set: {'emails.0.verified': true}});
    Roles.addUsersToRoles(userid, ['view-invoices','create-invoices']);
    console.log("Form submitted.");
  }
});
