var API_KEY = "166a433c57516f51dfab1f7edaed8413";
var today = moment().format('MM/DD/YY');
console.log("today is " + today);

// ON CLICK, RUN SEARCH AND FORECAST FUNCITONS
$(document).ready(function () { //prevents js from loading until the document is ready
    $('.btn').on("click", function () {
        let city = $("#searchValue").val();
        searchCityWeather(city);
        forecast(city);
        save();

    });

    // TODAY'S WEATHER
    function searchCityWeather(city) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
            dataType: "json",
            success: function (data) {
                //console.log(data);
                $("#cityResult").text(data["name"]);
                $("#tempResult").text("Tempreature: " + data["main"]["temp"] + "°F");
                $("#windResult").text("Wind Speed: " + data["wind"]["speed"] + "mph");
                $("#humidityResult").text("Humidity: " + data["main"]["humidity"] + "%");
                $("#uvResult").text("UV Index: " + data["name"]);

            }

        })
    }
    // 5DAY FORECAST
    function forecast(city) {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&units=imperial`,
            dataType: "json",
            success: function (data) {
                //console.log(data);
                for (var i = 0; i < 5; i++) {
                    $("#temp" + i).text("TEMP: " + data["list"][i]["temp"]["day"] + "°F");
                    $("#hum" + i).text("HUMIDITY: " + data["list"][i]["humidity"] + "%");
                    var iconURL = "http://openweathermap.org/img/wn/" + data["list"][i]["weather"][0]["icon"] + "@2x.png";
                    //console.log(iconURL);
                    $("#icon" + i).attr('src', iconURL);

                }

            }
        })
    }
    
 //SAVE TO LOCAL STORAGE   
    function save() {

        let city = $("#searchValue").val();
        var searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
     
        if(!searchHistory){
            searchHistory = []
     
        searchHistory.push(city);
     console.log(searchHistory, city)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        console.log(searchHistory);
     
       }
     
     
     
     }

    // RETRIEVE FROM LOCAL STORAGE
    /* function dispSearch() {
        for (var i = 0; i < 5; i++) {
            let storedContent = localStorage.getItem("search" + i); 
            console.log(storedContent); // get stored contents from all rows
            $("#search" + i).val(storedContent); // place saved text in same row

        }
    }; */

    // INCREASE DAYS BY 1
    for (var i = 0; i < 5; i++) {
        $("#day" + i).text(moment().add(i, 'd').format('MM/DD/YY'));
    }



});