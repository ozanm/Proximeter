window.onload = function() {
  var Client = require(["predicthq"]);

  var surveyTitles = ["First Off... Location!"];
  var address = "";
  var prefrences = {
    tech: undefined,
    art: undefined,
    history: undefined,
    math: undefined,
    sports: undefined,
    performing_arts: undefined,
    community: undefined,
  };
  var finalDetails = undefined;

  var coords = {
    lat: undefined,
    long: undefined,
  }

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
      navigator.geolocation.getCurrentPosition(function(position) {
        coords.lat = position.coords.latitude;
        coords.long = position.coords.longitude;
        getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
        setTimeout(function() {
          document.getElementById('surveyTitle').style.animation = "exiting 1.5s forwards";
          document.getElementById('location').style.animation = "exiting 1.5s forwards";
          setTimeout(function() {
            document.getElementById('surveyTitle').style.top = "100%";
          }, 1500);
        }, 3000);
      });
    }
  }
  function getPredictHQ(token) {
   let get = new XMLHttpRequest()
    get.open('POST','https://api.predicthq.com/v1/events/?within=10km@-36.844480,174.768368')
    get.setRequestHeader('Authorization', 'Bearer ' + api_key)

response = requests.get(
    url="https://api.predicthq.com/v1/events/",
    headers={"Authorization": "Bearer $ACCESS_TOKEN"}
)

print(response.json())
  // 7uoUm2GEVjCDqsLLEBA2GEBoeRnfSiWZTUEowVHC
  var phq = new Client({access_token: "7uoUm2GEVjCDqsLLEBA2GEBoeRnfSiWZTUEowVHC"})
  var find = phq.events.search({radius:'10m',latitude:cords.lat,longtiude:cords.long})
  console.log(find)
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
              setTimeout(function() {
                address = results[0].formatted_address;
                document.getElementById('location').classList.add("locationClass");
                document.getElementById('location').innerHTML = address
              }, 100);
          }
      });
  }
}
