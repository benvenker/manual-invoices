Template.login.events({
  'submit form': function(event, template){
    event.preventDefault();
    var email = trimInput(template.find('#login-email').value);
    var password = template.find('#login-password').value;

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

      Meteor.loginWithPassword(email, password, function (err) {
        if (err) {
          alert(err.reason);
        } else
        Router.go('invoiceSubmitForm');
          return false;
      });
    }
  }
});
