$(document).ready(function() {
	
	var hidden = true;
	$('.dd-link').click(function(e) {
		e.preventDefault();
		if (hidden){
			 $(this).next('.toggle').fadeToggle(200, function(){hidden = false;});
		}
	});

	$('html').click(function() {
		if (!hidden) {
			$('.toggle').fadeOut(150);
			hidden=true;
		}
	});

	$('.toggle .cross').click(function(event) {
		event.stopPropagation();
	});
	
	// hover tool tip
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});
	
	/* Scroll to Top */

  $(".totop").hide();

  $(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop()>300)
      {
        $('.totop').fadeIn();
      } 
      else
      {
        $('.totop').fadeOut();
      }
    });
    $('.totop a').click(function (e) {
      e.preventDefault();
      $('body,html').animate({scrollTop: 0}, 1000);
    });
  });
	
	/* Ecommerce sidebar */
   
  $(".navi li a").on("click", function(e){
    if($(this).parent('li').hasClass("has_sub")) {
      e.preventDefault();
    }
    
    if(!$(this).parent('li').hasClass("open")) {
      // hide any open menus and remove all other classes
      $(".navi li ul").slideUp(350);
      $(".navi li").removeClass("open");
      
      // open our new menu and add the open class
      $(this).next("ul").slideDown(350);
      $(this).parent('li').addClass("open");
    }
    
    else if($(this).parent('li').hasClass("open")) {
      $(this).parent('li').removeClass("open");
      $(this).next("ul").slideUp(350);
    }
  });

});