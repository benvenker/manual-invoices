storesEntered = function() {
  var table = $('.flakes-table tbody');
  var invoiceLineNum = 0;

  table.find('tr').each(function() {
    invoiceLineNum++;

    var store = $(this).find('.store').val();
    //if (!isNotEmpty(store)) {
    //  alert("Please enter a store in line " + invoiceLineNum);
    //  return false;
    //  //Router.go('invoiceEdit', invoice);
    //} else {
    //  console.log("store number for line " + invoiceLineNum + " is " + store);
    //  return true;
    }
  );
};


trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== ''){
    return true;
  }
  //console.log('Please fill in all required fields.');
  return false;
};

// Check if a required field has been provided
isProvided = function(e, field, fieldName, length) {
  var form = $('.grid-form');
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 9) {
    if (isNotEmpty(form.find(field).val())) {
      return true;
    } else {
      e.preventDefault();
      alert(fieldName + " is a required field!");
    }
  }
};

clearField = function (input) {
  if(input.value != '') { //Only clear if value is ''
    input.value = "";
  }
};

isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  console.log('Please enter a valid email address.');
  return false;
};

isValidPassword = function(password) {
  if (password.length < 6) {
    console.log('Your password should be 6 characters or longer.');
    return false;
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    console.log('Your two passwords are not equivalent.');
    return false;
  }
  return true;
};

isSelected = function(field) {
  if (field !== null) {
    return true;
  }
  alert('Please make a selection from all dropdowns in order to submit an invoice.')
  return false;
};

isValidLength = function(field, limit) {
  if(field.length < limit) {
    return false;
  }
  return true;
};