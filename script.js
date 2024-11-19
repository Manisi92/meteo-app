// script.js
const apiKey = process.env.API_KEY;  // API Key da variabili di ambiente
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&q=';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');

// Funzione per ottenere i dati del meteo
async function getWeather(city) {
    console.log("Fetching weather for city:", city);  // Aggiungi questo log per vedere se la funzione viene chiamata
    const url = `${apiUrl}${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);  // Aggiungi questo log per vedere cosa restituisce l'API

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
    console.log("City input value:", city);  // Aggiungi questo log per vedere cosa viene inserito nel campo

    if (city) {
        getWeather(city);  // Chiamata alla funzione per ottenere il meteo
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});
