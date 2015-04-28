/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr, Nav, History, WP, debounce */

// VARS

var basicAnimationSpeed = 800;

var navPercentHeight = 0.15;
var navMargin = $(window).height() * navPercentHeight;

var masonryOptions = {
  columnWidth: '.grid-sizer',
  gutterWidth: '.gutter-sizer',
  itemSelector: '.item'
};


// ROUTER

var Router = {
  init: function() {
    var _this = this;
    window.onstatechange = function() {
      Nav.minimize();
      var href = window.location.href;
      _this.loadContent(href);
    };
  },
  loadHref: function(href) {
    History.pushState(null, WP.blogName, href);
  },
  loadBlob: function(label) {
    if (label === 'shop'){
      window.location = WP.shopUrl;
    } else {
      History.pushState(null, WP.blogName, WP.origin + '/' + label);
    }
  },
  loadContent: function(href) {
    $('#preloader').addClass('show');
    $('#main-content, #footer').animate({'opacity': 0}, basicAnimationSpeed);
    $.ajax({
      url: href
    })
    .done(function(data, textStatus, jqXHR) {
      var content = $(data).find('#main-content > *');
      $('#main-content').html(content);

      $('#preloader').removeClass('show');
      $('html, body').animate({ scrollTop: '0px' }, basicAnimationSpeed/2);

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
    })
    .fail(function(jqXHR, textStatus, errorThrown) {

      $('#main-content').html('<h4 class="u-align-center">Eeek Something went wrong?! :(</h4>');
      $('#preloader').removeClass('show');
      $('html, body').animate({ scrollTop: '0px' }, basicAnimationSpeed/2);
      $('#main-content, #footer').animate({'opacity': 1}, basicAnimationSpeed);

    });
  },
};


// AJAX LINK LOAD

$('body').on('click', '.js-ajax-link', function() {
  Router.loadHref($(this).attr('href'));
  return false;
});


// LAYOUT

function fixNavMargin() {
  $('#main-content').css('padding-top', navMargin + 30);
}

$(window).on( 'resize', debounce( function() {
  $('#nav').height( $(window).height() );
  navMargin = $(window).height() * navPercentHeight;
  fixNavMargin();
}, 20));

// MAILCHIMP

$('body').on('submit', '#subscribe', function() {
  $('#subscribe-result').html('Sending...');
  $.ajax({
    url: '//fruitmilk.us8.list-manage.com/subscribe/post-json?u=b0b0183cd0a1db371072e3363&amp;id=5c344ff57c&c=?',
    type: 'GET',
    data: $('#subscribe').serialize(),
    dataType: 'jsonp',
    jsonp: 'c',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      if (data.result !== 'success') {
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


// DOC READY

jQuery(document).ready(function () {
  'use strict';

  // ROUTER

  Router.init();

  // LAYOUT

  fixNavMargin();
  $('#nav').height( $(window).height() );

    // MASONRY

  $('.js-masonry').imagesLoaded( function() {
    $('.js-masonry').masonry(masonryOptions);
  });

});
