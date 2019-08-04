$(function(){

  // getting scrollbar width function
  function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
  
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild (inner);
  
    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
  
    document.body.removeChild (outer);
  
    return (w1 - w2);
  };

  var scrollBarWidth = getScrollBarWidth();

  if ($(window).width() <= 767) {
    $('body').css({
      // "width": $(window).width()+getScrollBarWidth(),
      "width": "100%",
      "height": "100%",
      "overflow": "hidden",
      "position": "relative"
    });
    $('#main').css({
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "left": "0",
      "right": scrollBarWidth*(-1), 
      "overflow-y": "scroll",
      "overflow-x": "hidden"
    });
  }

  //setting up the nav menu beckground-color fading up  
  var $nav = $("#nav");
  if ($nav.offset().top > 72) {
    $nav.removeClass("no_scroll").addClass("scrolled");
  };
  
  $(document).on('scroll', function(){
    if ($nav.offset().top > 72) {
      $nav.removeClass("no_scroll").addClass("scrolled");
    } else {
        $nav.removeClass("scrolled").addClass("no_scroll");
    };
  });
  
    //setting up slider
    var $windowHeight = $(window).height();
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
        "draggable": true,
        // "adaptiveHeight": true,
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

      //setting up responsive main menu
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
        $mainMenu.toggleClass('menuBtnHide').css($cssDefault);
        $mainNav.toggleClass('navHide');
        menuIsOpen = true;
        $('body').toggleClass('body-noscroll');
      }      
    });

    $($menuCloseBtn).on('click', function(){
      if(menuIsOpen) {
        $mainMenu.toggleClass('menuBtnHide');
        $mainNav.toggleClass('navHide');
        menuIsOpen = false;
        $('body').toggleClass('body-noscroll');
      }
    });

    //setting up menu click jumping
    var $menuLinks = $('#nav a');
    $menuLinks.on('click', function() {
      var $menuItem = $(this).attr('href');
      //console.log($menuItem);
      var $itemPosition = $($menuItem).offset().top;
      //console.log($itemPosition);
      $('html, body').animate({
        scrollTop: $itemPosition
      }, 1000);
      if (menuIsOpen) {
        setTimeout(function() {
          $mainMenu.toggleClass('menuBtnHide');
          $mainNav.toggleClass('navHide');
          menuIsOpen = false;
          $('body').toggleClass('body-noscroll');
        }, 500); 
      }
    });

    //setting up portfolio
    var $portfolioCollition = $('.portfolioCollection');
    var mixer = mixitup($portfolioCollition);

    var $popupOpenImage = $('.previewWrapper');

    $popupOpenImage.on('click', function(){
      var $imgSrc = $(this).find('img').attr('src');

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

