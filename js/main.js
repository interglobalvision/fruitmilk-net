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
    $('#main-content, #footer').animate({'opacity': 0}, basicAnimationSpeed, function() {
      $.ajax({
        url: href,
        success: function(data) {
          content = $(data).find('#main-content > *');
          $('#main-content').html(content);
        }
      })
      .done(function() {
        $('html, body').animate({ scrollTop: "0px" }, basicAnimationSpeed/2);
        if ($('.js-masonry .item').length) {
          $('.js-masonry').imagesLoaded( function() {
            $('.js-masonry').masonry({
              columnWidth: '.grid-sizer',
              gutterWidth: '.gutter-sizer',
              itemSelector: '.item'
            });
          });
        }
        $('#main-content, #footer').animate({'opacity': 1}, basicAnimationSpeed);
      });
    });
  },
}


//AJAX POST LOAD
$('.js-ajax-item').on('click', function(event) {
  event.preventDefault();
  href = $(this).attr('href');
  Router.loadContent(href);
})


//RESIZE
$(window).on( 'resize', function() {
  debounce( $('#nav').height( $(window).height() ) );
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
$('#subscribe').submit(function(e) {
  e.preventDefault();
  e.stopPropagation();
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
