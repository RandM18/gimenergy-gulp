jQuery(function ($) {
    $("#burger").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("mobile-menu");
    });
    $(".mobileMenu__link-sub").on("click", function (e) {
        $(this).toggleClass("active");
    });

    const onScrollHeader = () => {
        const header = $(".header");
        let prevScroll = $(window).scrollTop();
        let currentScroll;
        $(window).scroll(() => {
            currentScroll = $(window).scrollTop();
            const headerHidden = () => header.hasClass("header_hidden");
            if (currentScroll > prevScroll && !headerHidden()) {
                header.addClass("header_hidden");
            }
            if (currentScroll < prevScroll && headerHidden()) {
                header.removeClass("header_hidden");
            }
            prevScroll = currentScroll;
        });
    };
    onScrollHeader();


    const mainsliderSmall = new Swiper(".mainslider-swiper-small", {
        speed: 700,
        allowTouchMove: false,
        loop: true,
    });
    const mainsliderText = new Swiper(".mainslider-text", {
        speed: 700,
        allowTouchMove: false,
        effect: "fade",
        fadeEffect: {
            crossFade: true, 
        }, 
    });
    const mainslider = new Swiper(".mainslider-swiper", {
        speed: 700,
        autoplay: {
            delay: 2000,
        },
        loop: true,
        pagination: {
            el: "#mainslider-page",
            clickable: true,
        },
        thumbs: {
            swiper: mainsliderText,
        },
    });
    mainslider.controller.control = mainsliderSmall;
    mainsliderSmall.controller.control = mainslider;

    const maincards = new Swiper(".maincards__grid2", {
        slidesPerView: 1.5,
        spaceBetween: 16,
        breakpoints: {
            768: {
                slidesPerView: 2.5,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
    const mainpricing = new Swiper(".mainpricing__cards", {
        slidesPerView: 1.5,
        spaceBetween: 16,
        breakpoints: {
            768: {
                slidesPerView: 3.5,
            },
            1024: {
                slidesPerView: 6,
            },
        },
    });
    const faq = new Swiper(".sfaq__tabs", {
        allowTouchMove: false,
    });

    $(".sfaq__links").on('click', 'a', function(e){
        e.preventDefault();
        $(".sfaq__links .active").removeClass('active');
        $(this).addClass('active');
        faq.slideTo($(this).data('tab'));
    });
   
    $(".maincard__title").hover(
        function () {
            $(this).closest(".maincard__body").addClass("hover");
        },
        function () {
            $(this).closest(".maincard__body").removeClass("hover");
        }
    );

    if($('#maincards-cart').length>0){
        const maincardBtnAnim = gsap.timeline({ paused: true });
        maincardBtnAnim
            .to("#maincards-cart", { duration: 0.2, x: 30 })
            .to("#maincards-cart", { duration: 0.2, x: -30 })
            .to("#maincards-cart", { duration: 0.2, x: 10 })
            .to("#maincards-cart", { duration: 0.2, x: -10 })
            .to("#maincards-cart", { duration: 0.2, x: 0 });

        $(".front-page .maincard input").on("change", function (e) {
            let c = $("#maincards-cart .count"),
                count = $(".maincard input:checked").length;
            c.html(count);
            maincardBtnAnim.restart();
            if (count > 0) {
                c.show();
                $("#maincards-cart .text").text("Continue");
            } else {
                c.hide();
                $("#maincards-cart .text").text("Sign up now");
            }
            if (!$(this).prop("checked")) {
                $(this).parent().removeClass("active");
                return;
            }
            $(this)
                .parent()
                .addClass("active")
                .clone()
                .css({ position: "absolute", "z-index": "100", bottom: "0" })
                .appendTo($(this).parent())
                .animate(
                    {
                        bottom: -150,
                        opacity: 0,
                    },
                    700,
                    function () {
                        $(this).remove();
                    }
                );
        });
    }

    if ($("#mainpricing-cart").length > 0) {
        const pricingBtnAnim = gsap.timeline({ paused: true });
        pricingBtnAnim
            .to("#mainpricing-cart", { duration: 0.2, x: 30 })
            .to("#mainpricing-cart", { duration: 0.2, x: -30 })
            .to("#mainpricing-cart", { duration: 0.2, x: 10 })
            .to("#mainpricing-cart", { duration: 0.2, x: -10 })
            .to("#mainpricing-cart", { duration: 0.2, x: 0 });

        $(".front-page .pricingcard input").on("change", function (e) {
            let c = $("#mainpricing-cart .count"),
                count = $(".pricingcard input:checked").length;
            c.html(count);
            pricingBtnAnim.restart();
            if (count > 0) {
                c.show();
                $("#mainpricing-cart .text").text("Continue");
            } else {
                c.hide();
                $("#mainpricing-cart .text").text("Let's go");
            }
            if (!$(this).prop("checked")) {
                $(this).parent().removeClass("active");
                return;
            }
            $(this)
                .parent()
                .addClass("active")
                .clone()
                .css({ position: "absolute", "z-index": "100", bottom: "0" })
                .appendTo($(this).parent())
                .animate(
                    {
                        bottom: -150,
                        opacity: 0,
                    },
                    700,
                    function () {
                        $(this).remove();
                    }
                );
        });
    }

    $(".pricing-page .pricingcard input").on("change", function (e) {
        let c = $(".pricingCards"),
            count = $(".pricingcard input:checked").length;
        if (count > 0) {
            c.slideDown();
            if ($(this).closest(".swiper-slide").index() % 2 == 0) {
                $(".pricingCards__header").hide();
            } else {
                $(".pricingCards__header").show().css("display", "flex");
            }
        } else {
            c.slideUp(); 
        }
        $(".pricingcard input").each(function(){
            if(!$(this).prop('checked')){
                $(this).closest('.pricingcard').removeClass('active');
            }
        });
        $(this)
            .parent()
            .addClass("active");
            let title = $(this).parent().find(".pricingcard__title").text();
            $(".pricingCards__title").text(title);
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $(".pricingCards__title").offset().top,
                },
                500
            );
    });

    $(".pricingCards__item_btn").hover(
        function () {
            $(this).closest(".pricingCards__item").addClass("hover");
        },
        function () {
            $(this).closest(".pricingCards__item").removeClass("hover");
        }
    );


    function isInView(elem) {
        return (
            elem.offset().top - $(window).height() / 2 <
                $(window).scrollTop() &&
            elem.offset().top + elem.outerHeight() - $(window).height() / 2 >
                $(window).scrollTop()
        );
    }

    function isInViewStep(elem) {
        let centerScreen = $(window).scrollTop() + $(window).height() / 2;
        return (
            elem.offset().top < centerScreen &&
            elem.offset().top + elem.outerHeight(true) > centerScreen
        );
    }
    $(window).scroll(function () {
        if ($(".maininfo").length) {
            if (isInView($(".maininfo__items"))) {
                let indexStep = 0;
                $(".maininfo__item").each(function (index, element) {
                    if (isInViewStep($(this))) {
                        indexStep = index;
                    }
                });

                if (
                    !$(".maininfo__counter li").eq(indexStep).hasClass("active")
                ) {
                    $(".maininfo__counter li.active").removeClass("active");
                    $(".maininfo__counter li").eq(indexStep).addClass("active");
                }
            }
        }
    });

   

    $(".faqItem__header").on('click', function(e){
        $(this).toggleClass("active").closest(".faqItem").find(".faqItem__body").slideToggle();
    });

    $(".pricing-page .selectbox").chosen({width:180});

    // const teamsize = new CustomSelect("#teamsize");
    // const adminsize = new CustomSelect("#adminsize");
    
    $("#continue-to-payment").on('click', function(e){
        e.preventDefault();
        $(".checkout__tab:eq(0)").hide();
        $(".checkout__tab:eq(1)").show();
        $(".checkout__sidebar:eq(0)").hide();
        $(".checkout__sidebar:eq(1)").show();
        $(".checkoutHeader__item:eq(1)").addClass('active');
    });
    $("#checkout-form").on('submit', function(e){
        e.preventDefault();
        $(".checkout__tab:eq(1)").hide();
        $(".checkout__tab:eq(2)").show();
        $(".checkout__sidebar:eq(1)").hide();
        $(".checkoutHeader__item:eq(2)").addClass("active");
    });

  
    // GSAP
    if($('.mainparallax').length>0){
        gsap.to(".mainparallax__wrapper", {
            scrollTrigger: {
                trigger: ".mainparallax",
                scrub: 2,
                start: "top center",
                end: "+=200",
                ease: "power1.out",
            },
            scale: 1,
        });
        const growTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".mainparallax",
                scrub: 1.5,
                start: "top center",
                end: "-=200",
                ease: "power1.out",
            },
        });
        growTl.to(".mainparallax__logo", {
            duration: 1,
            opacity: 1,
            top: "45%",
        });
        growTl.to(".mainparallax__logo", {
            duration: 1,
            delay: -0.1,
            width: "auto",
        });
    }
    if ($(".mainhead__title_row-1").length > 0) {
        gsap.to(".mainhead__title_row-1", {
            scrollTrigger: {
                trigger: ".mainhead",
                scrub: 2,
                start: "top",
                ease: "power1.out",
            },
            y: -50,
        });
    }
    if ($(".mainhead__title_row-2").length > 0)
        gsap.to(".mainhead__title_row-2", {
            scrollTrigger: {
                trigger: ".mainhead",
                scrub: 2,
                start: "top",
                ease: "power1.out",
            },
            y: -230,
        });
    if ($(".mainhead__text").length > 0)
        gsap.to(".mainhead__text", {
            backgroundPositionY: "100%",
            duration: 1,
        });

     if ($(".singlehead__title").length > 0)
         gsap.to(".singlehead__title", {
            scrollTrigger: {
            trigger: ".singlehead",
            scrub: 2,
            start: "top",
            ease: "power1.out",
            },
            y: -230,
         });


    if($('.featuresList').length>0){
        $(".featuresList__item").each(function(){
            gsap.to($(this), {
                scrollTrigger: {
                    trigger: $(this),
                    start: "-400 center",
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
            });
        });
        
    }
    
});