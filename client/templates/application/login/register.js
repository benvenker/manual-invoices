Template.register.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var email = template.find('#register-email').value;
    var password = template.find('#register-password').value;
    var passwordConfirm = template.find('#login-password-confirm').value;

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

      var user = {email: email, password: password};

      Meteor.call('createUserWithRole', user, 'create-invoices', function(err, result) {
        if (!err) {
          //User created!!
          //alert("Registration successful");
          return Meteor.loginWithPassword(user.email, user.password, function(error) {
            if (error) {
              return alert(error.reason);
            } else {
              return Router.go('invoiceSubmitForm');
            }
          });
        } else {
            //Insertion Error
          if (err)
            return alert(err.reason);
            }
      });
    }
  }
});