var key = "a5d6e72efa81ec4f4f836a740e2775dc";

var latitude;
var longitude;
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
var citiesList = [
  { name: "Atlanta", state: "GA" },
  { name: "Denver", state: "CO" },
  { name: "Seattle", state: "WA" },
  { name: "San Francisco", state: "CA" },
  { name: "Orlando", state: "FL" },
  { name: "New York", state: "NY" },
  { name: "Chicago", state: "IL" },
  { name: "Austin", state: "TX" },
  { name: "Los Angeles", state: "CA" },
];

// Gets weather from city on the list
$(document).ready(function () {
  function selectCity() {
    $("#city-list").on("click", "li", function () {
      cityElem = $(this);
      cityName = $(this).text().split(",")[0];

      if (cityElem.attr("data-state")) {
        var stateName = cityElem.attr("data-state");
      }
      console.log(cityName, stateName);
      getCoordinates(cityName, stateName);
    });
  }

  selectCity();

  // Creates city elem for the list and gets its weather
  $("#search-btn").click(function () {
    event.preventDefault();
    var cityName = $("#search-input").val().trim();
    var stateName = $("#state-input").val().trim();
    var maxItems = 9;
    var li;
    if (cityName !== "") {
      function getStateName() {
        var cityLocation = stateName ? `${cityName},${stateName},US` : cityName;
        var cities = `https://api.openweathermap.org/geo/1.0/direct?q=${cityLocation}&limit=5&appid=${key}`;
        fetch(cities)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var stateNameAbbr = data[0].state;
            var cityAbbr = getStateAbbr(stateNameAbbr);

            if (cityAbbr) {
              li = $("<li>").text(
                capitalWords(cityName) +
                  ", " +
                  (stateName.toUpperCase() || cityAbbr)
              );
            } else {
              li = $("<li>").text(capitalWords(cityName));
            }

            li.attr("data-state", stateName);
            $("#city-list").prepend(li);
            $("#search-input").val("");
            $("#state-input").val("");
            $("#city-list").each(function (index) {
              if ($("#city-list li").length > maxItems) {
                $("#city-list li:gt(" + (maxItems - 1) + ")").hide();
              }
              var newCity = {
                name: cityName,
                state: stateName ? stateName : cityAbbr,
              };
              citiesList.unshift(newCity);
              localStorage.setItem("citiesList", JSON.stringify(citiesList));
            });
          });
      }
      getStateName();
      getCoordinates(cityName, stateName);
    }
  });
});

// gets coordinates to find weather and state name
function getCoordinates(city, state) {
  var cityLocation = state ? `${city},${state},US` : city;

  var cities = `https://api.openweathermap.org/geo/1.0/direct?q=${cityLocation}&limit=5&appid=${key}`;
  console.log(cities);
  var date = new Date();
  var currentDate = formatDate(date);
  var dayLocation;
  if (state) {
    dayLocation =
      capitalWords(city) + ", " + state.toUpperCase() + " " + currentDate;
    $("#current-weather").text(dayLocation);
  } else {
    dayLocation = capitalWords(city) + " " + currentDate;
    $("#current-weather").text(dayLocation);
  }

  localStorage.setItem("dayLocation", JSON.stringify(dayLocation));

  fetch(cities)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      latitude = data[0].lat;
      longitude = data[0].lon;
      stateName = data[0].state;

      getWeather(latitude, longitude);
      getForecast(latitude, longitude);
    })
    .catch(function (error) {
      // Handle any errors that occurred during the API request
      alert("Cant find city.");
      location.reload();
    });
}

// gets current days weather
function getWeather(lat, lon) {
  var weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(weatherApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentTemp =
        "Currently: " + Math.floor(kelvinToFahrenheit(data.main.temp)) + " °F";
      var highTemp =
        "High: " + Math.floor(kelvinToFahrenheit(data.main.temp_max)) + " °F";
      var lowTemp =
        "Low: " + Math.floor(kelvinToFahrenheit(data.main.temp_min)) + " °F";
      var wind = "Wind: " + data.wind.speed + " MPH";
      var humidity = "Humidity: " + data.main.humidity + " %";
      var icon = data.weather[0].icon;

      $("#current-icon").attr("src", `assets/icons/${icon}.png`);

      $("#current-temp").text(currentTemp);

      $("#high-temp").text(
        "High: " + Math.floor(kelvinToFahrenheit(data.main.temp_max)) + " °F"
      );
      $("#low-temp").text(
        "Low: " + Math.floor(kelvinToFahrenheit(data.main.temp_min)) + " °F"
      );
      $("#wind li").text(wind);
      $("#humidity li").text(humidity);
      var weatherData = {
        currentTemp: currentTemp,
        highTemp: highTemp,
        lowTemp: lowTemp,
        wind: wind,
        humidity: humidity,
        icon: icon,
      };
      var weatherDataJSON = JSON.stringify(weatherData);

      localStorage.setItem("weatherData", weatherDataJSON);
    });
}

// gets 5 day forecast
function getForecast(lat, lon) {
  var forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(forecastApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cardContainer = document.getElementById("display-cards");
      cardContainer.innerHTML = "";

      // Get the current date and add one day to it
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);

      var forecastDataArray = [];

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

        // Get the icon id
        var icon = dataForDate[3].weather[0].icon;

        // Format the date
        var date = formatDate(nextDate);

        // save data into object
        var forecastData = {
          maxTemp: maxTemp,
          minTemp: minTemp,
          avgWind: avgWind,
          avgHumidity: avgHumidity,
          icon: icon,
          date: date,
        };

        forecastDataArray.push(forecastData);
        var forecastDataJSON = JSON.stringify(forecastDataArray);

        localStorage.setItem("forecastData", forecastDataJSON);

        // Create and append the card elements using the data
        var card = document.createElement("div");
        card.setAttribute("id", "card");

        var dateHeading = document.createElement("h3");
        dateHeading.setAttribute("id", "display-date");
        dateHeading.textContent = date;

        var img = document.createElement("img");
        img.setAttribute("src", `assets/icons/${icon}.png`);

        var weatherList = document.createElement("ul");
        weatherList.setAttribute("id", "card-weather");

        var tempList = document.createElement("ul");
        tempList.setAttribute("id", "card-temp");

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

        weatherList.appendChild(tempList);
        tempList.appendChild(highTempItem);
        tempList.appendChild(lowTempItem);
        weatherList.appendChild(windItem);
        weatherList.appendChild(humidityItem);

        card.appendChild(dateHeading);
        card.appendChild(img);
        card.appendChild(weatherList);

        cardContainer.appendChild(card);
      }
    });
}

function loadWeather() {
  var dayLocationJSON = localStorage.getItem("dayLocation");
  var dayLocation = JSON.parse(dayLocationJSON);
  console.log(dayLocationJSON);
  if (dayLocationJSON === null) {
  }
  $("#current-weather").text(dayLocation);

  var weatherDataJSON = localStorage.getItem("weatherData");
  var weatherData = JSON.parse(weatherDataJSON);

  var currentTemp = weatherData.currentTemp;
  var highTemp = weatherData.highTemp;
  var lowTemp = weatherData.lowTemp;
  var wind = weatherData.wind;
  var humidity = weatherData.humidity;
  var icon = weatherData.icon;

  $("#current-icon").attr("src", `assets/icons/${icon}.png`);
  $("#current-temp").text(currentTemp);
  $("#high-temp").text(highTemp);
  $("#low-temp").text(lowTemp);
  $("#wind li").text(wind);
  $("#humidity li").text(humidity);

  var forecastJSON = localStorage.getItem("forecastData");
  var forecastData = JSON.parse(forecastJSON);
  var cardContainer = document.getElementById("display-cards");

  cardContainer.innerHTML = ""; // Clear the card container before adding new cards

  for (var i = 0; i < forecastData.length; i++) {
    var forecast = forecastData[i];

    var maxTemp = forecast.maxTemp;
    var minTemp = forecast.minTemp;
    var avgWind = forecast.avgWind;
    var avgHumidity = forecast.avgHumidity;
    var iconF = forecast.icon;
    var date = forecast.date;

    var card = document.createElement("div");
    card.setAttribute("id", "card");

    var dateHeading = document.createElement("h3");
    dateHeading.setAttribute("id", "display-date");
    dateHeading.textContent = date;

    var img = document.createElement("img");
    img.setAttribute("src", `assets/icons/${iconF}.png`);

    var weatherList = document.createElement("ul");
    weatherList.setAttribute("id", "card-weather");

    var tempList = document.createElement("ul");
    tempList.setAttribute("id", "card-temp");

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

    weatherList.appendChild(tempList);
    tempList.appendChild(highTempItem);
    tempList.appendChild(lowTempItem);
    weatherList.appendChild(windItem);
    weatherList.appendChild(humidityItem);

    card.appendChild(dateHeading);
    card.appendChild(img);
    card.appendChild(weatherList);

    cardContainer.appendChild(card);
  }
}

loadWeather();

function loadCitiesList() {
  var savedCitiesList = localStorage.getItem("citiesList");
  var citiesListData = savedCitiesList
    ? JSON.parse(savedCitiesList)
    : citiesList;
  var liElem = [];
  var maxItems = 9;

  // Creates list of cities from retrieved data
  for (var i = 0; i < citiesListData.length; i++) {
    //checks if there is a state
    if (citiesListData[i].state === null) {
      li = $("<li>").text(citiesListData[i].name);
    } else {
      li = $("<li>").text(
        citiesListData[i].name + ", " + citiesListData[i].state
      );
    }
    liElem.push(li);
  }

  $("#city-list").prepend(liElem);
  if ($("#city-list li").length > maxItems) {
    $("#city-list li:gt(" + (maxItems - 1) + ")").hide();
  }
}

loadCitiesList();

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

// Gets state abbr from array
function getStateAbbr(stateName) {
  stateName = capitalWords(stateName);

  const stateObj = citiesAbr.find((state) => state.name === stateName);
  return stateObj ? stateObj.abbreviation : null;
}
