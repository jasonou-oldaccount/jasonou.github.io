var $rows = $('.muscles_list a');
$('.search_muscles').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    
    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

$('.abs').hover(function() {
   $('.abs_img').css('filter', 'grayscale(5)');
});

$(document).ready(function() {
    $('.not_main').hide();
    
    $(".abs").click(function() {
		$('.abs_sub').show();
        $('.not_abs').hide();
	});
    
    $(".arms").click(function() {
		$('.arms_sub').show();
        $('.not_arms').hide();
	});
    
    $(".shoulders").click(function() {
		$('.shoulders_sub').show();
        $('.not_shoulders').hide();
	});
    
    $(".back").click(function() {
		$('.back_sub').show();
        $('.not_back').hide();
	});
    
    $(".legs").click(function() {
		$('.legs_sub').show();
        $('.not_legs').hide();
	});
    
    $(".buttocks").click(function() {
		$('.buttocks_sub').show();
        $('.not_buttocks').hide();
	});
    
    $(".hips").click(function() {
		$('.hips_sub').show();
        $('.not_hips').hide();
	});
    
    $(".chest").click(function() {
		$('.chest_sub').show();
        $('.not_chest').hide();
	});
    
    $(".heart").click(function() {
		$('.heart_sub').show();
        $('.not_heart').hide();
	});
    
    $(".return").click(function() {
		$('.main').show();
        $('.not_main').hide();
	});
});