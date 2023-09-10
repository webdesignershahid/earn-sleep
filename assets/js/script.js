(function ($) {
    "use strict";

    var sleep = {

        
        /* ============================================================ */
        /* StickyHeader
        /* ============================================================ */
        sticky_header: function() {
            var fixed_top = $("header");
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 30) {
                    fixed_top.addClass("sticky");
                } else {
                    fixed_top.removeClass("sticky");
                }
            });
        },

        /* ============================================================ */
        /* Jquery Plugins Calling
        /* ============================================================ */
        onePageFunction: function(){
            $('header .main-menu a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                          scrollTop: target.offset().top - 150,
                        }, 100);
                        return false;
                    }
                }
            });
        },

        /* ============================================================ */
        /* Mobile Menu Integration
        /* ============================================================ */
        mobile_menu: function() {
            //Clone Mobile Menu
            function cloneMobileMenu($cloneItem, $mobileLoc) {
                var $combinedmenu = $($cloneItem).clone();
                $combinedmenu.appendTo($mobileLoc);                
            }
            cloneMobileMenu("header .main-menu > ul", ".mobile-menu .menu");

            function mobile_menu(selector, actionSelector) {
                var mobile_menu = $(selector);
                mobile_menu.on("click", function() {
                    $(selector).toggleClass('is-menu-open');
                });
                
                var hamburgerbtn = $(selector);
                hamburgerbtn.on("click", function() {
                    $(actionSelector).toggleClass('is-menu-open');
                });
        
                $(document).on('click', function(e) {
                    var selectorType = $(actionSelector).add(mobile_menu);
                    if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
                        $(actionSelector).removeClass("is-menu-open");
                        $(selector).removeClass("is-menu-open");
                    }          
                });
            
            };
            mobile_menu('.toggler-menu, .close-menu', '.mobile-menu');  	
            $('.mobile-menu ul li.menu-item-has-submenu > a').on('click', function () {
                var link = $(this);
                var closestUl = link.closest("ul");
                var parallelActiveLinks = closestUl.find(".active")
                var closestLi = link.closest("li");
                var linkStatus = closestLi.hasClass("active");
                var count = 0;

                closestUl.find("ul").slideUp(function () {
                    if (++count == closestUl.find("ul").length)
                        parallelActiveLinks.removeClass("active");
                });

                if (!linkStatus) {
                    closestLi.children("ul").slideDown();
                    closestLi.addClass("active");
                }
            });
        },


        /* ============================================================ */
        /* Swiper Slider Init
        /* ============================================================ */
        swiperCarousel: function () {
            var offerCarousel = new Swiper('.app-screens-slider', {
                slidesPerView: 2,
                freeMode: false,
                spaceBetween: 15,
                loop: true,
                // autoplay: {
                //     delay: 5000,
                // },
                speed: 1000,
                // navigation: {
                //     nextEl: '.offer-nav-next',
                //     prevEl: '.offer-nav-prev',
                // },
                breakpoints: {   
                    // when window width is >= 576px
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    // when window width is >= 992px
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }
            });            
            
        },

        /* ============================================================ */
        /* Scroll Top
        /* ============================================================ */
        scroll_to_top: function() {
            $('body').append(
                "<a href='#top' title='Scroll Top' id='scroll-top' class='topbutton btn-hide'><i class='fas fa-level-up-alt'></i></a>"
            );
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop.addClass('btn-show').removeClass('btn-hide');
                } else {
                    $scrolltop.addClass('btn-hide').removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function () {
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    'normal'
                );
                return false;
            });
        },

        /* ============================================================ */
        /* Background Image
        /* ============================================================ */
        background_image: function() {
            $("[data-bg-color], [data-bg-image], [data-color]").each(function() {
                var $this = $(this);

                if( $this.attr("data-bg-image") !== undefined ){
                    $this.css("background-image", "url("+ $this.attr("data-bg-image") +")");    
                    $this.css("background-size", $this.attr("data-bg-size"));
                    $this.css("background-repeat", $this.attr("data-bg-repeat"));
                    $this.css("background-position", $this.attr("data-bg-position"));
                    $this.css("background-blend-mode", $this.attr("data-bg-blend-mode"));
                }
                // Background Color    
                if( $("[data-bg-color]") ){
                    $this.css("background-color", $this.attr("data-bg-color") );
                }
                // Background Color   
                if( $("[data-color]") ){
                    $this.css("color", $this.attr("data-color") );
                }
            });
        },


        initialize: function() {
            sleep.sticky_header();
			sleep.onePageFunction();
			sleep.mobile_menu();
			sleep.swiperCarousel();
			sleep.scroll_to_top();
			sleep.background_image();
		}
    };
    $(function() {
		sleep.initialize();

        $(window).on('load', function() {
            $(".preloader").fadeOut();     
        });
	});


})(jQuery);