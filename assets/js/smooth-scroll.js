/*==========

Theme Name: Foodify - Food HTML5 Template
Theme Version: 1.0

==========*/

/*==========
----- JS INDEX -----
1.smooth scroll
2.Scroll to top
3.Scroll to Section
==========*/


// smooth scroll

var html = document.documentElement;
var body = document.body;

var scroller = {
    target: document.querySelector("#js-scroll-content"),
    ease: 0.08, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
    rotation: 0.001,
    force3D: true,
});

window.addEventListener("load", onLoad);

function onLoad() {
    updateScroller();
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll);
}

function updateScroller() {
    var resized = scroller.resizeRequest > 0;

    if (resized) {
        var height = scroller.target.clientHeight;
        body.style.height = height + "px";
        scroller.resizeRequest = 0;
    }

    var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;

    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
    }

    TweenLite.set(scroller.target, {
        y: -scroller.y,
    });

    requestId =
        scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

jQuery(".filters").on("click", function() {
    setTimeout(function() {
        onScroll();
        onResize();
    }, 1000);
});

// Scroll To Top
document.addEventListener("DOMContentLoaded", function() {
    const scrolltotop = document.querySelector(".scrolltop");

    if (scrolltotop) {
        scrolltotop.addEventListener("click", () =>
            gsap.to(window, {
                scrollTo: 0,
                duration: 0.5, // Adding duration for smoother animation
            })
        );
    }
});


// Scroll To Section
var nav = $('.foody-nav-menu, .banner-btn'), // Correcting the nav selector
    nav_height = nav.outerHeight();

nav.find('a').on('click', function() {
    var $el = $(this),
        id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);

    return false;
});

document.addEventListener("DOMContentLoaded", function() {
    const scrolltotop = document.querySelector(".scrolltop");

    if (scrolltotop) {
        scrolltotop.addEventListener("click", () => {
            gsap.to(window, {
                scrollTo: 0,
                duration: 0.5, // Adding duration for smoother animation
                ease: "power2.out" // Adding ease for smoother animation
            });
        });
    }
});

jQuery(".filters").on("click", function() {
    // Trigger scroll and resize events after filter click
    onScroll();
    onResize();
});

// Scroll To Section
var nav = $('.foody-nav-menu, .banner-btn'), // Correcting the nav selector
    nav_height = nav.outerHeight();

nav.find('a').on('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    var target = $(this.hash); // Get the target element by hash value
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - nav_height // Scroll to the target element's top position
        }, 500);
    }
});
