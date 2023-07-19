# Weather Dashboard Application Readme

![Weather Dashboard Screenshot](/assets/images/screenshot.png)

This is a simple Weather Dashboard application that allows users to search for the weather forecast of various cities in the United States. The application displays the current weather information along with a 5-day forecast for the selected city.

## Deployed Application

Check out the live version of the Weather Dashboard application [here](https://nickucla.github.io/Nicks-5-day-forecast-app/).

## How to Use the Application

1. Open the "index.html" file in a web browser to launch the application.

2. The header section of the application displays the title "Weather Dashboard."

3. On the left side of the page, you will find a search section where you can input a city name and an optional state name.

4. To search for weather information, type the name of the city in the "City" input box and, if necessary, the name of the state in the "State" input box. Then, click the "Search" button.

5. The application will retrieve weather data for the selected city and display it in the main section on the right side of the page.

6. The main section of the application displays the following information for the selected city:

   - Current weather condition and location
   - Current temperature
   - High temperature for the day
   - Low temperature for the day
   - Wind speed
   - Humidity percentage

7. Below the current weather information, you will find a 5-day forecast for the selected city. Each forecast card displays the date, an icon representing the weather condition, the temperature range for the day, the wind speed, and the humidity percentage.

8. The application also provides a list of pre-defined cities for quick access. You can click on any of these cities to view their weather information.

## Additional Information

- The application uses the OpenWeather API to fetch weather data for the selected cities.

- The weather data is presented in both Fahrenheit and miles per hour (MPH).

- The city and state search inputs support auto-capitalization, so you don't need to worry about capitalizing city and state names correctly.

- The application is responsive and adapts to different screen sizes. It will display the weather information and forecast in an organized manner, regardless of the device used.

- The application stores the user's selected cities in the browser's local storage. The cities list will persist even after refreshing or closing the application.

- The application also saves the weather data and forecast for the last searched city. When the user returns to the application, it will load the last searched city's weather data.

- The weather icons used in the application were created by the talented Graphic Designer Ashley Jager and can be found [here](https://www.iconfinder.com/iconsets/weather-icons-8).

- The weather data is retrieved from the OpenWeatherMap API.

## Technologies Used

The application is built using the following technologies:

- HTML: Used for the application's structure and layout.

- CSS: Used for styling the application's components and providing responsive design.

- JavaScript: Used for handling user interactions, fetching weather data, and updating the UI dynamically.

- jQuery: A JavaScript library used for simplifying DOM manipulation and AJAX requests.

- Bootstrap: A CSS framework used for responsive design and styling.

## Credits

The application was created by Nick Heal for educational purposes.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for personal and commercial purposes. However, attribution to the original author is appreciated.
