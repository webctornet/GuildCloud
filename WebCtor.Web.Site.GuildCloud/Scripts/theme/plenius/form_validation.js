function form_validate(form) {
  var isValidEmailAddress;
  isValidEmailAddress = function(emailAddress) {
    var pattern;
    pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };
  return form.find(".check").each(function() {
    var form_data;
    if ($(this).hasClass("email")) {
      form_data = $(this).val();
      if (isValidEmailAddress(form_data)) {
        $(this).removeClass("required");
        return $(this).addClass("passed");
      } else {
        $(this).removeClass("passed");
        $(this).addClass("required");
        $(this).animate({
          left: "-10px"
        }, 100).animate({
          left: "10px"
        }, 100);
        return $(this).animate({
          left: "0px"
        }, 100);
      }
    } else {
      if ($(this).val() === $(this).data('placeholder')) {
        $(this).removeClass("passed");
        $(this).addClass("required");
        $(this).animate({
          left: "-10px"
        }, 100).animate({
          left: "10px"
        }, 100);
        return $(this).animate({
          left: "0px"
        }, 100);
      } else {
        $(this).removeClass("required");
        return $(this).addClass("passed");
      }
    }
  });
};
