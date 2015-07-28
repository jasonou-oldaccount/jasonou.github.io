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
})(false);

/* Isotope Filter */
$(window).load( function() {
    // init Isotope
    var $grid = $('.grid').isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
    
    // filter functions
    var filterFns = {
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };
    
    // bind filter button click
    $('.filters-button-group').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });
});

var images = {
    1: [
        {
            href : 'http://fancyapps.com/fancybox/demo/1_b.jpg',                
            title : 'Gallery 1 - 1'
        },
        {
            href : 'http://fancyapps.com/fancybox/demo/2_b.jpg',                
            title : 'Gallery 1 - 2'
        },
        {
            href : 'http://fancyapps.com/fancybox/demo/3_b.jpg',                
            title : 'Gallery 1 - 3'
        }
    ],
    2: [
        {
            href : 'http://fancyapps.com/fancybox/demo/4_b.jpg',                
            title : 'Gallery 2 - 1'
        },
        {
            href : 'http://fancyapps.com/fancybox/demo/5_b.jpg',                
            title : 'Gallery 2 - 2'
        }
    ]
};

$(".open_fancybox").click(function() {
    $.fancybox.open(images[ $(this).index() + 1], {
        padding : 0
    });
    
    return false;
});