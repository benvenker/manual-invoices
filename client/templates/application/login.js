Template.login.events({
  'submit form': function(event, template){
    event.preventDefault();
    var emailVar = template.find('#login-email').value;
    var passwordVar = template.find('#login-password').value;
    Meteor.loginWithPassword(emailVar, passwordVar, function(err) {
      if (err) {
        alert("Login failed. Please try again or register");
      }
    });
    return false;
  }
});
