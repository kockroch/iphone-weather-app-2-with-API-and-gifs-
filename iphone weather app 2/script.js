const apiKey = "6b24a663e855b2eff8f918c60b8e7de3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const card = document.querySelector(".card");
const weatherIcon = document.querySelector(".weather-icon");

let slideInterval; 

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        card.style.backgroundImage = "";  
    } else {
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Set the background GIF based on weather condition
        let backgroundImage;
        switch (data.weather[0].main) {
            case "Clouds":
                backgroundImage = "url('assets2/clouds.gif')";
                break;
            case "Clear":
                backgroundImage = "url('assets2/clear.gif')";
                break;
            case "Drizzle":
                backgroundImage = "url('assets2/drizzle.gif')";
                break;
            case "Mist":
                backgroundImage = "url('assets2/mist.gif')";
                break;
            case "Rain":
                backgroundImage = "url('assets2/rain.gif')";
                break;
            case "Snow":
                backgroundImage = "url('assets2/snow.gif')";
                break;
            default:
                backgroundImage = "url('assets2/default.gif')";
        }

        card.style.backgroundImage = backgroundImage; // Set the background image
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    clearInterval(slideInterval);  // Stop the city slide when the user searches
    checkWeather(searchbox.value);
});

// Show famous cities weather on app load
const famousCities = ["New York", "London", "Tokyo", "Paris", "Sydney"];
let currentCityIndex = 0;

function showCityWeather() {
    checkWeather(famousCities[currentCityIndex]);
    currentCityIndex = (currentCityIndex + 1) % famousCities.length;
}

window.addEventListener("load", () => {
    showCityWeather();  // Show the first city's weather
    slideInterval = setInterval(showCityWeather, 5000);  // Start the slide interval
});
