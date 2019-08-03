$(function(){
    
    var $nav = $("#nav");
    var navOffsetTop = $nav.offset().top;
    $('body').on('scroll', function(){
      if (navOffsetTop > 80) {
        $nav.removeClass("no_scroll").addClass("scrolled");
      } else {
          $nav.removeClass("scrolled").addClass("no_scroll");
      };
    });
  
    var $windowHeight = $(window).height();
    // console.log($windowHieght);
    var $slick = $('#header .item');

    if ($windowHeight >= 900) {
      $slick.css('height', 900);
    } else {
      $slick.css('height', $windowHeight);
    }
    
    var $slider = $('.header__slider');

    $slider.on("click", function(e) {
        e.preventDefault();
        console.log(e);
    });

    var $prevArrow = $('.sliderNav .prevArrow');
    var $nextArrow = $('.sliderNav .nextArrow');
    var $dotsWrapper = $('.sliderNav .dots-container');

    $('.header__slider').slick({
        "accessibility": true,
        "adaptiveHeight": true,
        // "autoplay": true,
        "dots": true,
        prevArrow: $prevArrow,
        nextArrow: $nextArrow,
        appendDots: $dotsWrapper,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: false
            }
        }]
      });

      var $mainMenu = $('.mainMenu');
      var $mainNav = $('#nav');
      var $menuCloseBtn = $('.menuCloseBtn');
      var menuIsOpen = false;
      var $cssDefault = {
        "box-shadow": "none",
        "background-color": "transparent",
        "border-color": "transparent"
      }
    
    if (menuIsOpen) {
      $mainMenu.addClass('menuBtnHide');
    }
    
    $($mainMenu).on('click', function() {
      if (!menuIsOpen) {
        console.log('open');
        $mainMenu.toggleClass('menuBtnHide').css($cssDefault);
        $mainNav.toggleClass('navHide');
        menuIsOpen = true;
      }      
    });

    $($menuCloseBtn).on('click', function(){
      if(menuIsOpen) {
        console.log('close');
        $mainMenu.toggleClass('menuBtnHide');
        $mainNav.toggleClass('navHide');
        menuIsOpen = false;
      }
    });

    var $portfolioCollition = $('.portfolioCollection');
    var mixer = mixitup($portfolioCollition);

    // $portfolioCollition.magnificPopup({
    //   delegate: '.previewWrapper',
    //   type:"image"
    // });
    
    var $popupOpenImage = $('.previewWrapper');

    $popupOpenImage.on('click', function(){
      var $imgSrc = $(this).find('img').attr('src');

      console.log($imgSrc);

      $.magnificPopup.open({
        items: {
          src: $imgSrc
        },
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false       
      });

    });
});

