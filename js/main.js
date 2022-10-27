
$(document).ready(function () {



    // header menu active
    $('.header__menu-link').on('click', function () {
        $('.header__menu-link').removeClass('active');
        $(this).addClass('active');
    });

    // header bg
    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $('.header').addClass('scrolling');
        } else {
            $('.header').removeClass('scrolling');
        }
    });

    // header mobile menu
    $('.burger__btn, .header__menu-link').on('click', function () {
        $('.burger__btn').toggleClass('active');
        $('.header__menu').toggleClass('active');
    });



    // heroimage slider
    var swiper = new Swiper(".heroimage__slider", {
        effect: "fade",
        // autoplay: {
        //     delay: 800,
        // },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
            },
        },
    });

    // accordeon 

    $('.process__acordeon-header').click(function () {
        $(this).toggleClass('active');
        $(this).next('.process__acordeon-body').slideToggle();
    });

    // gallery slider

    var swiper = new Swiper(".gallery__slider-top", {
        slidesPerView: 2,
        spaceBetween: 32,
        slidesPerGroup: 2,
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 800,
        },
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                spaceBetween: 10,
                slidesPerView: 1,
                slidesPerGroup: 1,
            },
            768: {
                spaceBetween: 15,
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            992: {
                spaceBetween: 25,
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1200: {
                spaceBetween: 32,
                slidesPerView: 2,
                slidesPerGroup: 2,
            }
        }
    });
    var swiper = new Swiper(".gallery__slider-bottom", {
        slidesPerView: 3,
        spaceBetween: 32,
        slidesPerGroup: 3,
        loop: true,
        speed: 1400,
        autoplay: {
            delay: 800,
        },
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: {
                spaceBetween: 15,
            },
            992: {
                spaceBetween: 25,
            },
            1200: {
                spaceBetween: 32,
            }
        }
    });

    // gallery popup
    Fancybox.bind('[data-fancybox="gallery"]', {
        infinite: false
    });



    // ---------- PRODUCT CARD ---------- //

    // change color product images

    $(".tab").first().addClass('active');
    $(".tab-item").first().addClass('active-tab');


    $('.tab').on('click', function () {
        var dataClass = $(this).attr('data-tab');
        $('.tab-item').removeClass('active-tab').hide();
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.' + dataClass).addClass('active-tab').fadeIn(200);
        createSlider();
        sliderProduct()
    });

    // create product slider classes
    function createSlider() {
        $(".tab-item").each(function () {
            if ($(this).hasClass("active-tab")) {
                $(this).find(".small").addClass("smallImage");
                $(this).find(".big").addClass("bigImage");
            } else {
                $(this).find(".small").removeClass("smallImage");
                $(this).find(".big").removeClass("bigImage");
            }
        });
    }
    createSlider();


    //  slider product image

    function sliderProduct() {
        var smallImage = new Swiper(".smallImage", {
            slidesPerView: 4,
            direction: "vertical"
        });
        var bigImage = new Swiper(".bigImage", {
            slidesPerView: 1,
            effect: "fade",
            thumbs: {
                swiper: smallImage,
            }
        });
    }
    sliderProduct();


    // product gallery popup
    $('.active-tab').on('click', function () {
        var classGallery = $(this).attr('data-imgcolor');
        Fancybox.bind(`[data-fancybox="${classGallery}"]`, {
            infinite: false
        });
    });


    //  popup product card
    $('.popupbtn').on('click', function (e) {
        e.preventDefault();
        $('.popup').addClass('active');
    });
    $('.popup__close').on('click', function () {
        $('.popup').removeClass('active');
    });

    // counter
    $('.minus').click(function () {
        var $input = $('.product__form-counter').find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        summ();
        return false;
    });
    $('.plus').click(function () {
        var $input = $('.product__form-counter').find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        summ();
        return false;
    });

    // hides the missing color
    function hideColor(colorName) {
        if (colorName.length > 0) {
            var nullArr = colorName.split(" ");
            $(".input-field").removeClass('disabled');
            for (var i = 0; i <= nullArr.length; i++) {
                $('#' + nullArr[i]).parent('.input-field').addClass('disabled');
            }
        } else {
            $(".input-field").removeClass('disabled');
        }
    }

    // calculate 
    var material = 0,
        color = 0,
        amount = 0;

    $("input[name='material']").change(function () {
        material = $(this).data('price');
        var nullId = $(this).attr('data-null');
        hideColor(nullId);
        summ();
    });

    $("input[name='color']").change(function () {
        color = $(this).data('price');
        summ();
    });

    function summ() {
        material = Number(material);
        color = Number(color);
        amount = Number($('.product__form-counter').find('input').val());
        $(".price p").text((material + color) * amount);
    }

    // send data to hidden inputs
    $('.product__form-btn').on('click', function () {
        $('#name-hide').val($('.product__form-title').text());
        $('#material-hide').val($("input[name='material']:checked").val());
        $('#color-hide').val($("input[name='color']:checked").val());
        $('#price-hide').val($('.price p').text());
        $('#amount-hide').val($('.product__form-counter').find('input').val());
    });

    // click hidden btn
    $('.ralform__btn').on('click', function () {
        $('.ralform__btn--hidden').trigger('click');
    });

    // if ($('.jqzoom').length) {
        $(".zoomimg").jqZoom({
            selectorWidth: 40,
            selectorHeight: 40,
            viewerWidth: 500,
            viewerHeight: 400
          });
    // }



});