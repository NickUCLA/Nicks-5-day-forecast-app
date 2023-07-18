/*var input = $("#search-input");
var searchList = $("#search-list");
var searchBtn = $("#search-btn");
var displayDay = $("#display-day");
var displayCards = $("#display-cards");*/

var key = "a5d6e72efa81ec4f4f836a740e2775dc";

var latitude;
var longitude;

$(document).ready(function () {
  function selectCity() {
    $("#city-list").on("click", "li", function () {
      cityElem = $(this);
      cityName = $(this).text();
      console.log(cityName);
      if (cityElem.attr("data-state")) {
        var stateName = cityElem.attr("data-state");
        console.log(stateName);
      }
      getCoordinates(cityName, stateName);
    });
  }

  selectCity();

  $("#search-btn").click(function () {
    event.preventDefault();
    var cityName = $("#search-input").val().trim();
    var stateName = $("#state-input").val().trim();
    if (cityName !== "") {
      console.log(cityName);
      //getCoordinatesTwo(cityName, stateName);
      var li = $("<li>").text(cityName);
      li.attr("data-state", stateName);
      $("#city-list").append(li);
      $("#search-input").val("");
      $("#state-input").val("");
      getCoordinates(cityName, stateName);
    }
  });
});

function getCoordinates(city, state) {
  var location = state ? `${city},${state},US` : city;
  console.log(location);
  var cities = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${key}`;
  console.log(cities);
  var date = new Date();
  var currentDate = formatDate(date);

  if (state) {
    $("#current-weather").text(
      capitalWords(city) + ", " + state.toUpperCase() + " " + currentDate
    );
  } else {
    $("#current-weather").text(capitalWords(city) + " " + currentDate);
  }

  fetch(cities)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      latitude = data[0].lat;
      longitude = data[0].lon;

      console.log(data[0].state);
      getWeather(latitude, longitude);
      getForecast(latitude, longitude);
    });
}

function getWeather(lat, lon) {
  var weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(weatherApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var temperature =
        Math.floor(kelvinToFahrenheit(data.main.temp_max)) + // high temperature
        Math.floor(kelvinToFahrenheit(data.main.temp_min)); // low temperature

      var wind = "Wind: " + data.wind.speed + " MPH";
      var humidity = "Humidity: " + data.main.humidity + " %";

      console.log(temperature);
      console.log(wind);
      console.log(humidity);

      $("#high-temp").text(
        "High: " + Math.floor(kelvinToFahrenheit(data.main.temp_max)) + " °F"
      );
      $("#low-temp").text(
        "Low: " + Math.floor(kelvinToFahrenheit(data.main.temp_min)) + " °F"
      );
      $("#wind li").text(wind);
      $("#humidity li").text(humidity);
    });
}

function getForecast(lat, lon) {
  var forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(forecastApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var cardContainer = document.getElementById("display-cards");
      cardContainer.innerHTML = "";

      // Get the current date and add one day to it
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);

      for (var i = 0; i < 5; i++) {
        var nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + i);

        // Find all data entries for the corresponding date
        var dataForDate = data.list.filter(
          (item) =>
            formatDate(new Date(item.dt * 1000)) === formatDate(nextDate)
        );

        // Calculate the high and low temperatures for the day
        var maxTemp = Math.max(...dataForDate.map((item) => item.main.temp));
        var minTemp = Math.min(...dataForDate.map((item) => item.main.temp));

        // Calculate the average wind speed and humidity for the day
        var avgWind =
          dataForDate.reduce((sum, item) => sum + item.wind.speed, 0) /
          dataForDate.length;
        var avgHumidity =
          dataForDate.reduce((sum, item) => sum + item.main.humidity, 0) /
          dataForDate.length;

        // Format the date
        var date = formatDate(nextDate);

        // Create and append the card elements using the data
        var card = document.createElement("div");
        card.setAttribute("id", "card");

        var dateHeading = document.createElement("h3");
        dateHeading.setAttribute("id", "display-date");
        dateHeading.textContent = date;

        var img = document.createElement("img"); // Add the image, you can set its source here

        var weatherList = document.createElement("ul");
        weatherList.setAttribute("id", "card-weather");

        var highTempItem = document.createElement("li");
        highTempItem.textContent =
          "High: " + Math.floor(kelvinToFahrenheit(maxTemp)) + " °F";

        var lowTempItem = document.createElement("li");
        lowTempItem.textContent =
          "Low: " + Math.floor(kelvinToFahrenheit(minTemp)) + " °F";

        var windItem = document.createElement("li");
        windItem.textContent = "Wind: " + avgWind.toFixed(2) + " MPH";

        var humidityItem = document.createElement("li");
        humidityItem.textContent = "Humidity: " + avgHumidity.toFixed(2) + " %";

        weatherList.appendChild(highTempItem);
        weatherList.appendChild(lowTempItem);
        weatherList.appendChild(windItem);
        weatherList.appendChild(humidityItem);

        card.appendChild(dateHeading);
        card.appendChild(img);
        card.appendChild(weatherList);

        cardContainer.appendChild(card);
      }
    });
}

function kelvinToFahrenheit(temperature) {
  return ((temperature - 273) * 9) / 5 + 32;
}

function capitalWords(sentence) {
  return sentence
    .split(" ") // Split the sentence into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words back together with spaces
}

function formatDate(date) {
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  var year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/*
function getCities(city) {
  var cityListElem = $("#city-list");
  cityListElem.empty();
  var cities = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
  console.log(cities);

  fetch(cities)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        cities = data[i].name;
        state = data[i].state;

        var list = cities + ", " + state;
        console.log(list);
      }
    });
}*/

/*$(document).ready(function () {
  $("#search-input").on("input", function () {
    var cityName = $(this).val().trim();
    if (cityName !== "") {
      // Call the function to fetch city suggestions and populate the datalist
      fetchCitySuggestions(cityName);
    } else {
      // Clear datalist when input field is empty
      $("#city-suggestions").empty();
    }
  });
});

function fetchCitySuggestions(cityName) {
  // Replace YOUR_API_KEY with your actual OpenWeatherMap API key
  var suggestionsDatalist = $("#city-suggestions");
  var key = "a5d6e72efa81ec4f4f836a740e2775dc";
  // API URL to get city suggestions based on input
  var suggestionsUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${key}`;

  // Fetch the city suggestions from the API
  fetch(suggestionsUrl)
    .then((response) => response.json())
    .then((data) => {
      suggestionsDatalist.empty();
      data.forEach((city) => {
        console.log(city);
        var option = $("<option>")
          .attr("value", `${city.name}, ${city.state}`)
          .text(city.name + ", " + city.state);

        suggestionsDatalist.append(option);
      });
      suggestionsDatalist.on("click", (event) => {
        $("#search-input").val(event.target.value);
        var li = $("<li>").text(city.name + ", " + city.state);
        $("#city-list").append(li);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}*/

var citiesAbr = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];
