jQuery(document).ready(function () {
  'use strict';

  var masonry = $('.js-masonry');
  masonry.imagesLoaded( function() {
    masonry.masonry({
      columnWidth: '.grid-sizer',
      gutterWidth: '.gutter-sizer',
      itemSelector: '.item'
    });
  });

// MAILCHIMP
	$('#subscribe').submit(function(e) {
		var data, dataArray, url;
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
			error: function(err, text) {
				console.log("Mailchimp error:");
				console.log(text);
				console.log(err);
				alert("Subscription failure.");
			},
			success: function(data) {
				if (data.result === "success") {
					alert("Subscription success!")
				} else {
					console.log(data);
					alert("Subscription failure. " + data.msg);
				}
			}
		});
	});


});