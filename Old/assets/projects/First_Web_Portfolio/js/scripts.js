/*  ----------------------------
    Smooth Scroll
    ----------------------------*/

$(document).ready(function() {
	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top
	    }, 800);
	    return false;
	});
});

/*  ----------------------------
    Resume Text Appear on Click
    ----------------------------*/
   
$(document).ready(function() {
	
	$(".clickText").hide();
	
	$(".clickAppear").click(function() {
		$(this).next().slideToggle(300);
	});
	
});
