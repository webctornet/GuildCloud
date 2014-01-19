function dropdown_menu(){//dropdown menu show
  $(".main-menu").off('mouseenter','.first-level > li');
  $(".main-menu").off('mouseleave','.first-level > li');
  if($('.container').width() > '300'){
    var menu_Width=0;
    $(".second-level").hide().css({'height': 'auto'});
    $(".first-level > li").each(function(){
      menu_Width += $(this).width()+6;
    })
   
    $(".main-menu").css({
      'width': menu_Width+'px'
    });
    $(".main-menu").on('mouseenter','.first-level > li', function(){
      secon_level=$(this).children('.second-level')
      m_l=Math.round((secon_level.width()-$(this).width())/2)
      secon_level.css({
          'height': 'auto',
          'margin-left': '-'+m_l+'px'          
        }).stop().slideToggle(100);
    })
    $(".main-menu").on('mouseleave', '.first-level > li', function(){
      secon_level=$(this).children('.second-level');
      secon_level.stop().slideToggle(100);
    }); 
  }else{
    $(".main-menu").css({'width': '100%'});
    $(".second-level").each(function(){
      $(this)
        .css({
          'height': 'auto',
          'margin-left': 'auto' 
        }).show();
    });
    return;
  }
}
function placeholder() { // placeholder for inputs textarea
  //placeholder for form    
  $('input, textarea').focus(function() {
    if($(this).data('placeholder') == $(this).val())
    $(this).val('');  
  });
  $('input, textarea').blur(function() {
    if ($(this).val() == '') {
      $(this).val($(this).data('placeholder'));
    }
  });     
};

$(window).resize(function(){
  dropdown_menu();
})

$(document).ready(function(){
  dropdown_menu();
  placeholder();
  //for Tabs
  // setup ul.tabs to work as tabs for each div directly under div.panes
  $(".tabs-nav").tabs(".tabs-content > .tab-content");


  //for Toggles
  $(".accord").tabs(
      ".accord .accordion-content",
      {tabs: 'h5', effect: 'slide', initialIndex: 1}
  );
  //pretty photo in portfolio use
  $("a[data-rel^='prettyPhoto']").prettyPhoto({
    deeplinking : false,
    keyboard_shortcuts : false
  });

  //Form Validator
  $('.check_form input[type="submit"]').click(function(){
    form=$(this).closest('.check_form')
    console.log(form)
    form_validate(form);
    if(form.find(".check").hasClass("required")===true){
      return false
    }else{
      form.submit()
    }
  })
});
