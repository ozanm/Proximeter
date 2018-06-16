// Google GeoLocation API Key: AIzaSyA8pukmW_of-7QT_Y1FH9MkqZOq4X8Ux7o

var surveyTitles = ["First Off... Location!"];
var address = "";

document.getElementById('get_started').onclick = function() {
  document.getElementById('title').style.animation = "exiting 1.5s forwards";
  document.getElementById('explanation').style.animationDelay = "2.5s";
  document.getElementById('explanation').style.animation = "exiting 1.5s forwards";
  document.getElementById('get_started').style.animationDelay = "3.5s";
  document.getElementById('get_started').style.animation = "exiting 1.5s forwards";
  document.getElementById('surveyTitle').innerHTML = surveyTitles[0];
  document.getElementById('surveyTitle').style.animationDelay = "3.5s";
  document.getElementById('surveyTitle').style.animation = "startSurveyTitle 2.5s forwards";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
    });
  }
}

function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            setTimeout(function() { address = results[0].formatted_address; }, 1000);
        }
    });
}
