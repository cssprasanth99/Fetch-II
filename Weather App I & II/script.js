
let searchbtn = document.querySelector(".search-btn");
let cityInput = document.querySelector(".city-input");
let weatherCardsDiv = document.querySelector(".weather-cards");
let currentWeatherDiv = document.querySelector(".current-weather");

searchbtn.addEventListener("click", () => {
    getWeatherData();
});

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </li>`;
    }
}

// function createWeatherCard(cityName, weatherItem, index) {
//     if (index === 0) {
//         return `<div class="details">
//         <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
//         <h4>Temperature: ${(weatherItem.main.temp - 273.15)}°C</h4>
//         <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
//         <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//     </div>
//     <div class="icon">
//         <img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather">
//         <h4>${weatherItem.main[0].description}</h4>
//     </div>`
//     }
//     else {
//         return `<li class="card">
//     <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
//     <img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather">
//     <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
//     <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
//     <h4>Humidity: ${weatherItem.main.humidity}%</h4>
// </li>`
//     }
// }

const API_KEY = "a4966985d531f84b8bd9a8e96a42b8d6";

const getWeatherDetails = (cityName, lat, lon) => {
    let WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then((res) => res.json()).then((data) => {
        const uniqueForecastDays = [];
        const fiveDaysforecast = data.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        console.log(fiveDaysforecast);

        weatherCardsDiv.innerHTML = "";
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";

        fiveDaysforecast.forEach((weatherItem, index) => {
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
            else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }

        });

    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    })
}

const getWeatherData = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_URL).then((res) => res.json()).then((data) => {
        if (!data.length) return alert("An error occurred while fetching the coordinates!");
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    })
}



// let url = `https://api.openweathermap.org/data/2.5/weather`;


// function getWeatherData() {
//     let cityName = document.getElementById("city-input").value;
//     fetch(`${url}?q=${cityName}&appid=a4966985d531f84b8bd9a8e96a42b8d6`)
//         .then((res) => {
//             return res.json();
//         }).then((data) => {
//             appendData(data);
//         }).catch((error) => {
//             console.log("Error in fetching data", error);
//         })
// }

// function appendData(data) {
//     let weatherData = document.getElementById("weather-data");

//     var date = new Date(data.dt * 1000);

//     var formattedDate = date.toLocaleString();

//     console.log("Formatted date and time:", formattedDate);


//     let name = document.createElement("p");
//     name.textContent = data.name;
//     let placeDate = document.createElement("p");
//     placeDate.textContent = formattedDate;
//     let temp = document.createElement("p");
//     temp.textContent = (data.main.temp - 273).toFixed(2) + "'C";
//     let windspeed = document.createElement("p");
//     windspeed.textContent = data.wind.speed + "m/s";
//     let pressure = document.createElement('p');
//     pressure.textContent = data.main.pressure + "hPa"
//     let humidity = document.createElement('p');
//     humidity.textContent = data.main.humidity + "hPa"
//     let visibility = document.createElement('p');
//     visibility.textContent = (data.visibility) / 1000 + "Km"
//     weatherData.append(name, temp, placeDate, pressure, humidity, visibility);

// }


