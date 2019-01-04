$(document).ready(function() {
  var date = new Date();
  
  $("#dateTime").html(date.toDateString() + " " + date.toLocaleTimeString());
  
  if ("geolocation" in navigator) {
    var lat, lon, cTemp, fTemp;
    
     navigator.geolocation.getCurrentPosition(function(position) {
      lat = Math.round(position.coords.latitude*100)/100; //limiting the precision might help reduce Shenzen JP responses.
      lon = Math.round(position.coords.longitude*100)/100;
               
      //call weather API
      $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, function(response){
        //Do Stuff with the JSON object rejoicing in the name "response"
        if(response.name=="Shuzenji"){
          $("#tempUnits").hide();
          $("#cityName").html("API Overload. Please try again later.");
        }
           
        else{
          cTemp = response.main.temp;  //Temp in Celcius
          fTemp = cTemp*1.8+32;         //temp in Fahrenheit
          fTemp = Math.round(fTemp*10)/10;
          $("#temperature").html(fTemp + "°");
          $("#tempUnits").text("F");

          $("#weatherIcon").attr("src",response.weather[0].icon);
          $("#weatherType").html(response.weather[0].main);
          $("#cityName").html(response.name + ", ");
          $("#stateName").html(response.sys.country);
        }
      });
      
    });
    
    
  }  
  else {
    console.log("Geolocation not available.");
  }
  
  $("#tempUnits" ).click(function() {
  
    if($("#tempUnits").text() == "F")
      {
        $("#tempUnits").text("C");
        $("#temperature").html(cTemp + "°");
      }
    else{
      $("#tempUnits").text("F");
      $("#temperature").html(fTemp + "°");
    }
});
    
  
});