

console.log("hello");



//Imbedded map
var embedAPIkey = "AIzaSyADcGH--swBBpg6-7tYcluAngele15Sz6M";


var userinput   = "hungtington beach";
$("#map1").attr("src","https://www.google.com/maps/embed/v1/place?key="+embedAPIkey+"&q="+userinput);

var lat;
var long;
//Google long. lat. coordinates GEOCODING API
var coordinatequeryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+userinput+"&key="+embedAPIkey;
var nearbyqueryURL = "";
var map;

//We need initMap for google library to work, doesn't necessarily need to define just declaration
function initMap() {
	// body...
}


//This AJAX call the google geocoding API for the user's long/lat and find places/weather near that coordinates
$.ajax({
          url: coordinatequeryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          lat = (response.results[0].geometry.location.lat);
          long = (response.results[0].geometry.location.lng);
          console.log("Lat: "+lat);
          console.log("Lng: "+long);

          function initMap() {
		  map = new google.maps.Map(document.getElementById('map1'), {
		  });

		  var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
		  location: {lat: lat, lng: long},
		  radius: 500,
    	  type: ['food'],
    	  name: "asian"
		  }, callback);
		}
		initMap();
		weatherMAP(lat,long);

})

//Google nearby Places

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		console.log(results);	
		console.log(results[0].name);
		console.log(results[1].name);

		for(var i=0; i<results.length;i++){
		$(".mappanel").append("<h3>"+results[i].name+"</h3>");
		$(".mappanel").append("Rating: "+results[i].rating);
		}
	}
}

//WEATHER INFO
// day tripper san diego
// project
// $("button").on("click", function() {
    //   var person = $(this).attr("data-person");

function weatherMAP(latitude,longitude){
    console.log('start');
    var api = "63f2fa3cfc2e61381b22c657bc65c0cf"
    var lat = latitude;
    var long = longitude;
    if (document.location.protocol.indexOf('file') >= 0) {
      console.log(document.location.protocol.indexOf());
      var queryURL = 
        "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat +  
        "&lon=" + long + "&cnt=5" + "&APPID=" + api;
    }
    else {
      var queryURL = 
        "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat +  
        "&lon=" + long + "&cnt=5" + "&APPID=" + api;
        // "https://api.openweathermap.org/data/2.5/forecast?id=2172797&APPID=63f2fa3cfc2e61381b22c657bc65c0cf"
    };

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        callWeather(response);
      	console.log(response);
      });
  };

  
function callWeather(response) {
      
      $('#wx').empty();
      for (var i = 0; i < 5; i++) {
        var wx = response;
        var city = wx.city.name;
        var weather = wx.list[i]
          .weather[0].description;
        var icon = wx.list[i]
          .weather[0].icon;
        console.log(city);
        console.log(weather);
        console.log(icon);

        var gifDiv = $("<div class='icon'>");
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var p = $("<p>").append('<span>' + weather + '</span>' );
        gifDiv.append("<img src='" + iconUrl  + "'>");
        gifDiv.append(p);
        $('#wx').append(gifDiv);
      };
};

      