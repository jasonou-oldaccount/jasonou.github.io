// Fades in initial elements
$('.container').hide().fadeIn(2000);

// Tool tip
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

// Heart Pulse
(function pulse(back) {
    $('.heart').animate(
        {
            'font-size': (back) ? '1.5em' : '2em',
            opacity: (back) ? 1 : 0.5
        }, 700, function(){pulse(!back)});
    $('#seventyfive img').animate(
        {
            'width': (back) ? '2em' : '1.5em'
        }, 700);
})(false);