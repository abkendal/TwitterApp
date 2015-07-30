// Stats:
// 	-Average sentiment over last 100 texts
// 	-tweets/day (search last 500 tweets, look at the date of the oldest then do some math)
// 	-



var app = {};


app.getTweets = function(){
	$.ajax({
		url : 'http://localhost/twitterApp/tweets_json.php',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			twitter_path: '1.1/search/tweets.json',		
			q: 'Nickelback',
			lang: 'en',
			result_type: 'recent',
			count: 10
		},
		success : function(tweet){
			app.compileTweets(tweet);
		}
	})
};

app.compileTweets = function(tweets){
	var compiledTweet = '';
	$.each(tweets, function(i, tweetData){
		$.each(tweetData, function(j, tweet){
			if (tweet.text) {
				compiledTweet = compiledTweet + " "+ tweet.text;
			}
		})
	})
	// Remove all twitter handles, urls and dashes. 
	compiledTweet = compiledTweet.replace(/\@\S+/g,"").replace(/\http\S+/g,"").replace(/\-\S+/g,"");
	console.log(compiledTweet);
	app.analyzeSentiment(compiledTweet);
};

app.analyzeSentiment = function(tweetText){
	$.ajax({
		url: 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment',
		type: 'GET',
		dataType: 'json',
		data: {
			apikey: '5f798feb1fb9ee663aa54a9e10a5d9ff179408c0',
			outputMode: 'json',
			text:tweetText
		},
		success: function(){
			
		}
	})
};



app.init = function (){
	app.getTweets();
};

$(function(){
	app.init();
});