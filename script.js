// script.js
const apiKey = 'b14931e715b012bcc6a7b433958382b1';  // sostituisci con la tua API Key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&q=city_name&appid=b14931e715b012bcc6a7b433958382b1'

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');

// Funzione per ottenere i dati del meteo
async function getWeather(city) {
    console.log("Fetching weather for city:", city);  // Log per vedere la città passata

    const url = `${apiUrl}${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);  // Log per vedere la risposta dell'API

        if (data.cod === '404') {
            console.log("City not found");  // Log se la città non viene trovata
            weatherInfo.innerHTML = `<p>Sorry, the city "${city}" was not found.</p>`;
        } else {
            console.log("Weather data:", data);  // Log dei dati meteo
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
        console.error('Error:', error);  // Log per eventuali errori
        weatherInfo.innerHTML = '<p>Sorry, an error occurred. Please try again later.</p>';
    }
}

// Aggiungi un listener al pulsante "Get Weather"
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();  // Previene il comportamento predefinito (submit form)
    
    const city = cityInput.value.trim();
    console.log("City input value:", city);  // Log per vedere cosa c'è nel campo di input

    if (city) {
        getWeather(city);  // Chiamata alla funzione per ottenere il meteo
    } else {
        console.log("City input is empty");  // Log se il campo è vuoto
        weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
    }
});
