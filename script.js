window.onload = function() {
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
  var finalDetails = []; // 0: address, 1: preferded prefrences

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
            document.getElementById('surveyTitle').innerHTML = "Tell us one of your interests, hobbies, fav places to go, etc."
            document.getElementById('surveyTitle').style.top = "0%";
            document.getElementById('surveyTitle').style.animation = "startSurveyTitle 2.5s forwards";
            document.getElementById('prefrence').style.animationDelay = "1.5s";
            document.getElementById('prefrence').style.animation = "show 1.5s forwards"
          }, 1500);
        }, 3000);
      });
    }
  }
  function getPredictHQ() {
   let get = new XMLHttpRequest()
    get.open('GET','http://api.eventful.com/rest/events/search?app_key=bd4MggXwmhL8fn3q&where=32.746682,-117.162741&within=15&keywords=books','FALSE')
    get.send()
    get.onreadystatechange = function() {
      if(get.readyState === 4) {
        console.log(JSON.parse(get.responseText))
      }
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
              setTimeout(function() {
                address = results[0].formatted_address;
                document.getElementById('location').classList.add("locationClass");
                document.getElementById('location').innerHTML = address
              }, 100);
          }
      });
  }
  getPredictHQ()
}
