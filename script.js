var API_KEY = "166a433c57516f51dfab1f7edaed8413";
var today = moment().format('MM/DD/YY');
console.log("today is " + today);
var lat;
var lon;
var uv;

// ON CLICK, RUN SEARCH AND FORECAST FUNCITONS
$(document).ready(function () { //prevents js from loading until the document is ready
    //SEARCH NEW CITY
    $('.btn').on("click", function () {
        let city = $("#searchValue").val();
        searchCityWeather(city);
        forecast(city);
        save();
        dispSearch()
    });
    //SEARCH FROM HISTORY
    $('h4').on("click", function () {
        let city = $(this).text(); 
        console.log(city);
        searchCityWeather(city);
        forecast(city);
    });

    // TODAY'S WEATHER
    function searchCityWeather(city) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
            dataType: "json",
            success: function (data) {
                //console.log(data);
                $("#cityResult").text(data["name"]);
                $("#tempResult").text("Tempreature: " + data["main"]["temp"] + "°F");
                $("#windResult").text("Wind Speed: " + data["wind"]["speed"] + "mph");
                $("#humidityResult").text("Humidity: " + data["main"]["humidity"] + "%");
                lat = (data["coord"]["lat"]);
                lon = (data["coord"]["lon"]);
                uv(); 
            }
        })
    }
    // 5DAY FORECAST
    function forecast(city) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&units=imperial`,
            dataType: "json",
            success: function (data) {
                //console.log(data);
                for (var i = 0; i < 5; i++) {
                    $("#temp" + i).text("TEMP: " + data["list"][i]["temp"]["day"] + "°F");
                    $("#hum" + i).text("HUMIDITY: " + data["list"][i]["humidity"] + "%");
                    var iconURL = "https://openweathermap.org/img/wn/" + data["list"][i]["weather"][0]["icon"] + "@2x.png";
                    //console.log(iconURL);
                    $("#icon" + i).attr('src', iconURL);
                }
            }
        })
    }
// UV INDEX
    function uv(city) {
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
            dataType: "json",
            success: function (data) {
                $("#uvResult").text("UV Index: " + data["value"]);
                //console.log(data);
                uv = data["value"];
                console.log(uv);
                if (uv >= 7) { // COLOR CODE UV INDEX
                    $(uvResult).addClass("high")
                } else if (2.99 <= uv <= 6.99) {
                    $(uvResult).addClass("medium")
                } else if (uv <= 2) {
                    $(uvResult).addClass("low")
                }
                }
            }
        )};
   
 //SAVE TO LOCAL STORAGE   
    function save() {

        let city = $("#searchValue").val();
        var searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
     
        if(!searchHistory){
            searchHistory = []
        }
     
        searchHistory.push(city);
        console.log(searchHistory, city)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        console.log(searchHistory);
     
       }
     

    // RETRIEVE FROM LOCAL STORAGE
    function dispSearch() {
        let storedContent = JSON.parse(localStorage.getItem("searchHistory")) || [];
               for (var i = 0; i < 5; i++) {
                   //console.log(storedContent);
                   $("#search" + i).text(storedContent[i]);
               }
           };

    // INCREASE DAYS BY 1
    for (var i = 0; i < 5; i++) {
        $("#day" + i).text(moment().add(i, 'd').format('MM/DD/YY'));
    }



});
