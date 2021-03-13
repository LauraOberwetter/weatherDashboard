var API_KEY = "166a433c57516f51dfab1f7edaed8413";


$(document).ready(function() { //prevents js from loading until the document is ready
    $('.btn').on("click", function() {
        let city = $("#searchValue").val();
        searchCityWeather(city);
     });
    function searchCityWeather (city) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
            dataType: "json",
            success: function(data) {
                console.log(data);
                $("#cityResult").text(data["name"]);
                $("#tempResult").text("Tempreature: " + data["main"]["temp"] + "°F");
                $("#windResult").text("Wind Speed: " + data["wind"]["speed"] + "mph");
                $("#humidityResult").text("Humidity: " + data["main"]["humidity"] + "%");
                $("#uvResult").text("UV Index: " + data["name"]);

            }

        })
    }
    function forecast (city) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
            dataType: "json",
            success: function(data) {
                console.log(data);
            }

        })
    }

  

});