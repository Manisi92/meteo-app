// script.js
const apiKey = dcc2f92fa96e39fd3378a3842d16ab19;  // API Key da variabili di ambiente
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&q=';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');

// Funzione per ottenere i dati del meteo
async function getWeather(city) {
    const url = `${apiUrl}${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfo.innerHTML = `<p>Sorry, the city "${city}" was not found.</p>`;
        } else {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfo.innerHTML = `
                <div class="weather-data">
                    <h2>${city}</h2>
                    <p><strong>Temperature:</strong> ${temperature}°C</p>
                    <p><strong>Weather:</strong> ${weather}</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        weatherInfo.innerHTML = '<p>Sorry, an error occurred. Please try again later.</p>';
    }
}

// Aggiungi un listener al pulsante "Get Weather"
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();  // Previene il submit del form (evita il ricaricamento della pagina)
    
    const city = cityInput.value.trim();
    
    if (city) {
        getWeather(city);  // Chiamata alla funzione per ottenere il meteo
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});
