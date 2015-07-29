var twitterApp = {};


app.getTweets = function(){
	$.ajax({
		url : 'localhost/twitterApp/twitter_json.php',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			twitter_path: '1.1/search/tweets.json',
			q: 'Toronto'
		}
	})
};



twitterApp.init = funtion (){
	app.getTweets();
};

$(function(){
	twitterApp.init();
});