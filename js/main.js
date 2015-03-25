jQuery(document).ready(function () {
  'use strict';

  if ($('body').hasClass('page-about')) {
    var url = 'https://api.instagram.com/v1/users/928570277/media/recent/?client_id=e8f11a6e3e484422b9f2cadea94f160f';

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function (data) {
        console.log(data);
        for (var i = 0; i < 6; i++) {
          var item = data['data'][i];
          $('#instagram').append('<a href="' + item.link + '" target="_blank"><img class="instagram-image" src="' + item.images.standard_resolution.url + '" /></a>');
        }
      },
    });
  }

  var masonry = $('.js-masonry');
  masonry.imagesLoaded( function() {
    masonry.masonry({
      columnWidth: '.grid-sizer',
      gutterWidth: '.gutter-sizer',
      itemSelector: '.item'
    });
  });

});