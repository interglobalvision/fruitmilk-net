jQuery(document).ready(function () {
  'use strict';

  var url = 'https://api.instagram.com/v1/users/928570277/media/recent/?client_id=e8f11a6e3e484422b9f2cadea94f160f';

	$.ajax({
	    url: url,
	    dataType: 'jsonp',
	    success: function (data) { 
	    	console.log(data);
		    for (var i = 0; i < 6; i++) {
		    	var src = data['data'][i]['images']['standard_resolution']['url'];
		    	var link = data['data'][i]['link'];
			    $('.instagram').append('<a href="'+link+'" target="_blank"><img src="'+src+'" /></a>');
				}
	    },
	});
});
