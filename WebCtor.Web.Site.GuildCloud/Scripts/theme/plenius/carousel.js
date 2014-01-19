$(document).ready(function(){
	$('.home-slider .flexslider').flexslider({
    animation: "slide",
    move: 1,
    directionNav: false
  });

  $('.recent-projects .flexslider, .blog-posts .flexslider, .about-team .flexslider').flexslider({
    animation: "slide",
    controlNav: false,
    itemWidth: 270,
    animationLoop: true,
    slideshow: false,
    move: 1
  });

  $('.clients .flexslider').flexslider({
    animation: "slide",
    controlNav: false,
    itemWidth: 150,
    animationLoop: true,
    slideshow: false
  });
  $('.quotes .flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      slideshow: false
  });
  $('.c-1 .flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      slideshow: false
  });
  $('.latest-projects .flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      slideshow: false
  });
});
