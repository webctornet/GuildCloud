// DOMContentLoaded
$(document).ready(function() {

  // get the first collection
  var applications = $('.portfolio-items');

  // clone applications to get a second collection
  var data = applications.clone();

  $('.filter a').on('click', function(e) {
    $('.filter a').removeClass('active')
    $(this).addClass('active')
    if ($(this).data('value') == 'all') {
      var filteredData = data.find('.item');
    } else {
      var filteredData = data.find('.' + $(this).data('value'));
    }

    // finally, call quicksand

    $('.portfolio-items').quicksand(filteredData, {
      duration: 800,
      easing: 'easeInOutQuad',
      adjustHeight: "auto",
      useScaling: true,
      attribute: 'id'
    });
                e.preventDefault()
  });
});
