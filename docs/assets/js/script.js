$(function(){var e=function(){var e=document.createElement("p");e.style.width="100%",e.style.height="200px";var o=document.createElement("div");o.style.position="absolute",o.style.top="0px",o.style.left="0px",o.style.visibility="hidden",o.style.width="200px",o.style.height="150px",o.style.overflow="hidden",o.appendChild(e),document.body.appendChild(o);var t=e.offsetWidth;o.style.overflow="scroll";var s=e.offsetWidth;return t==s&&(s=o.clientWidth),document.body.removeChild(o),t-s}();$(window).width()<=767&&($("body").css({width:"100%",height:"100%",overflow:"hidden",position:"relative"}),$("#main").css({position:"absolute",top:"0",bottom:"0",left:"0",right:-1*e,"overflow-y":"scroll","overflow-x":"hidden"}));var o=$("#nav");72<o.offset().top&&o.removeClass("no_scroll").addClass("scrolled"),$(document).on("scroll",function(){72<o.offset().top?o.removeClass("no_scroll").addClass("scrolled"):o.removeClass("scrolled").addClass("no_scroll")});var t=$(window).height(),s=$("#header .item");900<=t?s.css("height",900):s.css("height",t),$(".header__slider").on("click",function(e){e.preventDefault(),console.log(e)});var l=$(".sliderNav .prevArrow"),n=$(".sliderNav .nextArrow"),i=$(".sliderNav .dots-container");$(".header__slider").slick({accessibility:!0,draggable:!0,dots:!0,prevArrow:l,nextArrow:n,appendDots:i,responsive:[{breakpoint:768,settings:{dots:!1}}]});var r=$(".mainMenu"),a=$("#nav"),d=$(".menuCloseBtn"),c=!1,v={"box-shadow":"none","background-color":"transparent","border-color":"transparent"};c&&r.addClass("menuBtnHide"),$(r).on("click",function(){c||(r.toggleClass("menuBtnHide").css(v),a.toggleClass("navHide"),c=!0,$("body").toggleClass("body-noscroll"))}),$(d).on("click",function(){c&&(r.toggleClass("menuBtnHide"),a.toggleClass("navHide"),c=!1,$("body").toggleClass("body-noscroll"))}),$("#nav a").on("click",function(){var e=$(this).attr("href"),o=$(e).offset().top;$("html, body").animate({scrollTop:o},1e3),c&&setTimeout(function(){r.toggleClass("menuBtnHide"),a.toggleClass("navHide"),c=!1,$("body").toggleClass("body-noscroll")},500)});var p=$(".portfolioCollection");mixitup(p);$(".previewWrapper").on("click",function(){var e=$(this).find("img").attr("src");$.magnificPopup.open({items:{src:e},type:"image",closeOnContentClick:!0,closeBtnInside:!1})})});
//# sourceMappingURL=map/script.js.map
