Template.resetPassword.events({
  'submit #resetPasswordForm': function(e) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
        email = trimInput(resetPasswordForm.find('#resetPasswordEmail').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword({email: email}, password, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          alert('Your password has been changed. Welcome back!');
          Router.go('landingPage')
        }
      });
    }
    return false;
  }
});

Template.resetPassword.helpers({
  resetPassword: function(){
    return Session.get('resetPassword');
  }
});
