jQuery(document).ready(function($) {
    'use strict';
    $(".Modern-Slider").slick({
        autoplay:true,
        speed:2000,
        slidesToShow:1,
        slidesToScroll:1,
        pauseOnHover:false,
        dots:true,
        fade: true,
        pauseOnDotsHover:true,
        cssEase:'linear',
        draggable:false,
        prevArrow:'<button class="PrevArrow"></button>',
        nextArrow:'<button class="NextArrow"></button>', 
    });

    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });

    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
            e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
        
    })

    $(".box-video").click(function(){
        $('iframe',this)[0].src += "&amp;autoplay=1";
        $(this).addClass('open');
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:30,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop:false
            }
        }
    })

    var contentSection = $('.content-section, .main-banner');
    var navigation = $('nav');
    
    //when a nav link is clicked, smooth scroll to the section
    navigation.on('click', 'a', function(event){
        event.preventDefault(); //prevents previous event
        smoothScroll($(this.hash));
    });
    
    //update navigation on scroll...
    $(window).on('scroll', function(){
        updateNavigation();
    })
    //...and when the page starts
    updateNavigation();
    
    /////FUNCTIONS
    function updateNavigation(){
        contentSection.each(function(){
            var sectionName = $(this).attr('id');
            var navigationMatch = $('nav a[href="#' + sectionName + '"]');
            if( ($(this).offset().top - $(window).height()/2 < $(window).scrollTop()) &&
                    ($(this).offset().top + $(this).height() - $(window).height()/2 > $(window).scrollTop()))
                {
                    navigationMatch.addClass('active-section');
                }
            else {
                navigationMatch.removeClass('active-section');
            }
        });
    }
    function smoothScroll(target){
        $('body,html').animate({
            scrollTop: target.offset().top
        }, 800);
    }


    $('.button a[href*=#]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top -0 }, 500, 'linear');
    });
});

//My form
$(document).ready(function(){
    //Flag
    let sending = false;

    //Set restrictions
    $('input#phone').numeric();

    //Create form validation
    $('form#contact').validate({
		rules : {
			'name' : { required:true },
			'email' : { required:true, email:true },
			'phone' : { required:true, digits:true, minlength: 7 },
			'message' : { required:true }
		},
		messages : {
			'name' : { required:'Este campo es requerido' },
			'email' : { required:'Este campo es requerido', email:'Verifica el email' },
			'phone' : { required:'Este campo es requerido', digits:'Escribe un teléfono válido', minlength: 'Escribe un teléfono válido' },
			'message' : { required:'Por favor cuéntas qué quieres saber' }
		},
        errorElement: "em",
        errorClass: "failed",
		submitHandler:function(form){
            $('.success').hide();
            grecaptcha.ready(function() {
                grecaptcha.execute('6LcAlY0eAAAAAN8ZFbWAzOSiogj4GDKMVXr9hWML', {action: 'submit'}).then(function(token) {
                    //Post data
                    var data = $('form#contact').serializeArray();
                    data.push({"name":"token", "value":token});
                    
                    if(!sending){
                        sending = true;
                        $.post('register.php', data)
                        //Success
                        .done(function() {
                            document.getElementById("contact").reset();
                            $('.success').show();
                            sending = false;
                        })
                        //Error
                        .fail(function(err) {
                            console.log('Error is triggered', err);
                            alert( "Hay un problema enviando tus datos. Por favor intenta de nuevo más tarde." );
                            sending = false;
                        });
                    }
                });
            });
        }
    });
});
