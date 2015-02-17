Template.register.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var email = template.find('#register-email').value;
    var password = template.find('#register-password').value;
    var passwordConfirm = template.find('#login-password-confirm').value;

    if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

      Accounts.createUser({email: email, password: password}, function (err) {
        if (err) {
          if (err.message === 'Email already exists. [403]') {
            alert('We are sorry but this email is already used.');
          } else {
            alert('We are sorry but something went wrong.');
          }
        } else
          alert('Congrats new Meteorite, you\'re in!');
        Router.go('invoiceSubmitForm');
        return false;
      });
    }
  }
});
