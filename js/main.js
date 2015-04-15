/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr, Nav */

var basicAnimationSpeed = 1000;

function l(data) {
  console.log(data);
}


// ROUTER
var Router = {
  loadBlob: function(label) {
    History.pushState(null, null, wp.origin + '/' + label);
  },
  loadContent: function(href) {
    $('#preloader').addClass('show');
    $('#main-content, #footer').animate({'opacity': 0}, basicAnimationSpeed, function() {
      $.ajax({
        url: href,
        success: function(data) {
          content = $(data).find('#main-content > *');
          $('#main-content').html(content);
        }
      })
      .done(function() {
        $('#preloader').removeClass('show');
        $('html, body').animate({ scrollTop: "0px" }, basicAnimationSpeed/2);
        if ($('.js-masonry .item').length) {
          $('.js-masonry').imagesLoaded( function() {
            $('.js-masonry').masonry({
              columnWidth: '.grid-sizer',
              gutterWidth: '.gutter-sizer',
              itemSelector: '.item'
            });
            $('#main-content, #footer').animate({'opacity': 1}, basicAnimationSpeed);
          });
        } else {
          $('#main-content, #footer').animate({'opacity': 1}, basicAnimationSpeed);
        }
      });
    });
  },
}


//AJAX LINK LOAD
$('body').on('click', 'a.js-ajax-link', function() {
  href = $(this).attr('href');
  History.pushState(null, null, href);
  return false;
});


//RESIZE
var navMargin = $(window).height() * 0.15;
$('#main-content').css('padding-top',navMargin+30);

$(window).on( 'resize', function() {
  debounce( function() {
    var navMargin = $(window).height() * 0.15;
    $('#main-content').css('padding-top',navMargin+30);
  });
});


//DOC READY
jQuery(document).ready(function () {
  'use strict';

  $('#nav').height( $(window).height() );

  $('.js-masonry').imagesLoaded( function() {
    $('.js-masonry').masonry({
      columnWidth: '.grid-sizer',
      gutterWidth: '.gutter-sizer',
      itemSelector: '.item'
    });
  });
});



// MAILCHIMP
$('body').on('submit', '#subscribe', function(e) {
  $('#subscribe-result').html('Sending...');
  $.ajax({
    url: '//fruitmilk.us8.list-manage.com/subscribe/post-json?u=b0b0183cd0a1db371072e3363&amp;id=5c344ff57c&c=?',
    type: 'GET',
    data: $('#subscribe').serialize(),
    dataType: 'jsonp',
    jsonp: 'c',
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data.result !== "success") {
        //ERROR
        console.log(data.msg);
        $('#subscribe-result').html('Sorry! Something went wrong... Try again?');
      } else {
        $('#subscribe-result').html('Yesssssss! U did it');
      }
    }
  });
  return false;
});
/*
   e.preventDefault();
   e.stopPropagation();
   url = '//fruitmilk.us8.list-manage.com/subscribe/post?u=b0b0183cd0a1db371072e3363&amp;id=5c344ff57c';
   data = {};
   dataArray = $(this).serializeArray();
   $.each(dataArray, function(index, item) {
   return data[item.name] = item.value;
   });
   $.ajax({
url: url,
data: data,
dataType: 'jsonp',
success: function(data) {
console.log(data);
if (data.result === "success") {
alert("Subscription success!")
} else {
console.log(data);
alert("Subscription failure. " + data.msg);
}
}
});*/
