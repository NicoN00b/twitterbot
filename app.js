
var TwitterPackage = require('twitter');

// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = require('./bot');

var Twitter = new TwitterPackage(secret);

var query = "Yamhill+Pub";
Twitter.get('search/tweets', {q: query, count: 10, lang:"en"}, function(error, tweets, response) {

   var tweet_list = tweets['statuses'];

   for (var i = 0; i < tweet_list.length; i++) {
   		// if ('retweeted_status' in tweet_list[i]) {
   		// 	continue;
   		// }
   		var screen_name = tweet_list[i].user.screen_name;
   		var message = "@" + screen_name + " The Origin of Portland's Foodie Scene";
   		var tweet_id = tweet_list[i].id_str

   		try {
		    Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
			     console.log("Tweet posted successfully!")
  			});
  		}

  		catch(err) {
  		    console.log(err);
  		}
   }
});
