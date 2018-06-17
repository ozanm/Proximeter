var coordslat = undefined;
var coordslong = undefined;
var query = undefined;
var cells = [];

var surveyTitles = ["First Thing's First... Location!"];
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

var teller = document.createElement("h1");

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
      document.getElementById('location_info').style.animationDelay = "0.5s";
      document.getElementById('location_info').style.animation = "typing 3.5s steps(40, end), show 1s forwards, blink-caret .75s step-end";
      setTimeout(function() {
        document.getElementById('surveyTitle').style.animation = "exiting 1.5s forwards";
        document.getElementById('location_info').style.animation = "exiting 1.5s forwards";
        setTimeout(function() {
          document.getElementById('surveyTitle').innerHTML = "Tell us an interest, hobby, fav place to go, etc."
          document.getElementById('surveyTitle').style.top = "0%";
          document.getElementById('surveyTitle').style.animation = "startSurveyTitle 2.5s forwards";
          document.getElementById('prefrence').style.top = '0%';
          document.getElementById('prefrence').style.animationDelay = "1.5s";
          document.getElementById('prefrence').style.animation = "show 1.5s forwards"
        }, 1500);
      }, 7000);
    });
  }
}

document.getElementById('prefrence').onkeypress = function() {
  document.getElementById('finished').style.animation = "show 1.5s forwards";
}
document.getElementById('finished').onclick = function() {
  document.getElementById('surveyTitle').style.animation = "exiting 1.5s forwards";
  document.getElementById('prefrence').style.animationDelay = "0.75s";
  document.getElementById('prefrence').style.animation = "exiting 1.5s forwards";
  document.getElementById('finished').style.animationDelay = "1.5s";
  document.getElementById('finished').style.animation = "exiting 1.5s forwards";
  finalDetails = [[coords.lat, coords.long], document.getElementById('prefrence').value];

  setDetails(coordslat, coordslong, document.getElementById('prefrence').value);
};

function setDetails(lat, lon, q) {
  
  var username = 'httpsproximeterglitchme';
  var password = 'kjxhft7rftgz';
  
  // 'https://api.eventful.com/json/events/search?app_key=bd4MggXwmhL8fn3q&where=' + lat + ',' + lon + '&within=5&keywords=' + q
  $.ajax({
    url: 'https://api.eventfinda.co.nz/v2/events.json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
    },
    success: function(xhr) {
      teller = document.createElement("h1");
      teller.innerHTML = "Click ESC to go back to the homepage!";
      teller.style = "position: absolute; top: 0; left: 0; width: 100%; height: 150px; border: none; outline: none; text-align: center; font-family: 'Varela Round', sans-serif; font-size: 40px; color: white; opacity: 0;";
      teller.style.animation = "show 3s forwards";
      document.body.appendChild(teller);
      $( document ).on( 'keydown', function ( e ) { if ( e.keyCode === 27 ) { location.reload(); }});
      for(var i = 0; i < xhr.events.length; i++) {
        var randomGradientColor = randomGradient();
        var y = 150
        if(i !== 0 && i === 1) {
          y = (150 * i) + 100;
        } else if(i !== 0 && i !== 1) {
          y = ((50 * (i + 1)) * 2) + 50;
        }
        var cell = document.createElement("button");
        cell.type = "button"
        cell.id =  "cell" + cells.length.toString;
        cell.style = "position: absolute; top: " + y + "px; left: -95%; width: 90%; height: 80px; border-radius: 80px; border: none; background: " + randomGradientColor + "; color: white; font-family: 'Varela Round', sans-serif; font-size: 40px; text-align: center; line-height: 80px; outline: none;";
        cell.innerHTML = "Name: " + xhr.events[i].category.name + " Time: " + xhr.events[i].datetime_summary;
        document.body.appendChild(cell);
        if(i === 0) {
          cell.style.animation = "parallax_effect_forwards 2s 0s forwards";
        } else {
          var delay = (i - 0.25 + "s")
          cell.style.animation = "parallax_effect_forwards 2s " + delay + " forwards";
        }
        cells.push(cell);
      }
      cells.forEach(function(element, index) {
        element.onclick = function() { showDetails(xhr.events[index]); }
      });
    }
  });
}

function randomGradient() {
  var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
  
  function populate(a) {
    for ( var i = 0; i < 6; i++ ) {
      var x = Math.round( Math.random() * 14 );
      var y = hexValues[x];
      a += y;
    }
    return a;
  }
  
  var newColor1 = populate('#');
  var newColor2 = populate('#');
  var angle = Math.round( Math.random() * 360 );
  
  var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";
  
  return gradient;
}

function showDetails(category) {
  for(var i = 0; i < cells.length; i++) {
    cells[i].style.opacity = "1";
  }
  for(var i = 0; i < cells.length; i++) {
    cells[i].style.animation = "parallax_effect_backwards 2s 0s forwards";
    if(i === cells.length - 1) {
      showDetailsPartTwo(category);
    }
  }
}

function showDetailsPartTwo(category) {
  teller.style.animation = "hide 3s forwards";
  document.getElementById('surveyTitle').innerHTML = category.category.name;
  document.getElementById('surveyTitle').style.animation = "startSurveyTitle 2.5s 2.5s forwards";
  document.getElementById('explanation').innerHTML = category.description;
  document.getElementById('explanation').style.top = "55%";
  document.getElementById('explanation').style.left = "15%";
  document.getElementById('explanation').style.animation = "showExplanation 1.5s 5s forwards";
  var img = document.createElement('img');
  img.src = category.images.images[0].transforms.transforms[3].url;
  img.style = "position: absolute; top: 50%; left: 25%; width: 50%; height: 30%; opacity: 0; border-radius: 25px; outline: none;";
  img.style.animation = "show 3s 15s forwards";
  document.body.appendChild(img);
  var address = document.createElement("h5");
  address.innerHTML = "Address: " + category.address + "<br />Time: " + category.datetime_summary;
  address.style = "position: absolute; top: 90%; left: 0%; width: 100%; height: 20%; color: white; font-size: 25px; font-family: 'Varela Round', sans-serif; opacity: 0; text-align: cetner;";
  address.style.animation = "addressInit 2.5s 7.5s forwards";
  document.body.appendChild(address)
  var homepage = document.createElement('a');
  homepage.href = category.url;
  homepage.innerHTML = 'HomePage';
  homepage.style = "position: absolute; top: 10%; left: 0%; width: 100%; height: 20%; font-family: 'Varela Round', sans-serif; font-size: 35px; color: white; text-align: center; opacity: 0;";
  homepage.style.animation = "homepageInit 2.5s 10s forwards";
  homepage.target = "_blank";
  document.body.appendChild(homepage);
  var back_button = document.createElement("button");
  back_button.type = "button";
  back_button.innerHTML = "-->";
  back_button.style = "position: absolute; top: 100%; left: 80%; width: 20%; height: 10%; background-color: white; color: turquoise; border-radius: 75px; font-family: 'Varela Round', sans-serif; font-size: 75px; opacity: 0; outline: none; border: none;";
  back_button.style.animation = "backButtonInit 1s 12.5s forwards";
  document.body.appendChild(back_button);
  for(var i = 0; i < cells.length; i++) {
    cells[i].style.left = "-95%";
  }
  back_button.onclick = function() {
    back_button.style.animation = "backButtonDeInit 2.5s forwards";
    homepage.style.animation = "homepageDeInit 2.5s forwards";
    address.style.animation = "addressDeInit 2.5s forwards";
    img.style.animation = "hide 3s forwards";
    document.getElementById('surveyTitle').style.animation = "exiting 1.5s forwards";
    document.getElementById('explanation').style.animation = "endExplanation 1.5s forwards";
    setTimeout(function() {
      teller.style.animation = "show 3s forwards";
      for(var i = 0; i < cells.length; i++) {
        if(i === 0) {
          cells[i].style.animation = "parallax_effect_forwards 2s 0s forwards";
        } else {
          var delay = (i - 0.25 + "s")
          cells[i].style.animation = "parallax_effect_forwards 2s " + delay + " forwards";
        }
      }
    }, 2500);
  }
}