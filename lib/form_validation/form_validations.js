trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  alert('Please fill in all the required fields');
  return false;
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
}

