const apiKey = '697309230ed44c01b9a152004241911';  // Sostituisci con la tua chiave API
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        const temperature = data.current.temp_c;
        const weather = data.current.condition.text;
        const windSpeed = data.current.wind_kph;

        weatherInfo.innerHTML = `
            <div class="weather-data">
                <h2>${city}</h2>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Weather:</strong> ${weather}</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        weatherInfo.innerHTML = '<p>Sorry, an error occurred. Please try again later.</p>';
    }
}

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});
