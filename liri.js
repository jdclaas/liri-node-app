var dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require('request');
// var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var secondCommand = process.argv[3];


function findConcerts(artist) {
  var bandsintown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
  request(bandsintown, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Venue: " + body.venue.name);
      console.log("Location: " + body.venue.city);
      console.log("Date: " + body.datetime);
          }

function spotifyThisSong(song){
  spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
      if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
          console.log("Artist: " + songData.artists[0].name);
          console.log("Song: " + songData.name);
          console.log("Preview URL: " + songData.preview_url);
          console.log("Album: " + songData.album.name);
          } 
      } else {
      console.log('Error occurred.');
      }
  });
  }

  function omdb(movie){
      var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=trilogy&plot=short&tomatoes=true';
    
      request(omdbURL, function (error, response, body){
        if(!error && response.statusCode == 200){
          var body = JSON.parse(body);
          console.log("Title: " + body.Title);
          console.log("Release Year: " + body.Year);
          console.log("IMdB Rating: " + body.imdbRating);
          console.log("Country: " + body.Country);
          console.log("Language: " + body.Language);
          console.log("Plot: " + body.Plot);
          console.log("Actors: " + body.Actors);
          console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
          console.log("Rotten Tomatoes URL: " + body.tomatoURL);
        } else{
          console.log('Error occurred.')
        }
        if(movie === "Mr. Nobody"){
          console.log("");
        }
      });
    }
    function doThing(){
      fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
    
        spotifyThisSong(txt[1]);
      });
    }

switch (command) {
    case ('concert-this'):
        findConcerts();
    break;
    case ('spotify-this-song'):
        if(secondCommand){
            spotifyThisSong(secondCommand);
         } else{
            spotifyThisSong("The Sign");
         }
    break; 
    case ('movie-this'):
        if(secondCommand){
            omdb(secondCommand);
        } else{
            omdb("Mr. Nobody");
        }
    break;
    case ('do-what-it-says'):
         doThing();
    break;
    default:
        console.log('Try again');
};


    
        
     
 



