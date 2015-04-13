/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document, Modernizr, Nav */

var basicAnimationSpeed = 2000;

function l(data) {
  console.log(data);
}

// ROUTER

function router( hash ) {

  hash = hash.replace("#!/",'');

  l(hash);

  if (hash === 'menu') {
    Menu.maximize();

  } else {
    Menu.minimize();

  }

}

jQuery(document).ready(function () {
  'use strict';

  // Router: on change
  window.onhashchange = function () {
    var hash = window.location.hash.replace("#",'');
    router( 'director', hash );
  };

  // Router: on load
/*
  if ( window.location.hash ) {
    var hash = window.location.hash.replace("#",'');
    router( 'director', hash );
  }
*/

  Menu.init();

  var masonry = $('.js-masonry');
  masonry.imagesLoaded( function() {
    masonry.masonry({
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
