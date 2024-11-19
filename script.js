// script.js

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');

// API Key e URL per OpenWeatherMap
const apiKey = 'dcc2f92fa96e39fd3378a3842d16ab19'; // Sostituisci con la tua API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it&q=';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `${apiUrl}${city}&appid=${apiKey}`;

    // Aggiungi questa riga per vedere l'URL nella console
    console.log('URL della richiesta:', url);
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.cod === '404') {
            weatherInfo.innerHTML = `<p>Mi dispiace, la città "${city}" non è stata trovata.</p>`;
        } else {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfo.innerHTML = `
                <div class="weather-data">
                    <h2>${city}</h2>
                    <p><strong>Temperatura:</strong> ${temperature}°C</p>
                    <p><strong>Condizioni:</strong> ${weather}</p>
                    <p><strong>Umidità:</strong> ${humidity}%</p>
                    <p><strong>Vento:</strong> ${windSpeed} km/h</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Errore:', error);  // Stampa l'errore nella console
        weatherInfo.innerHTML = '<p>Si è verificato un errore, riprova più tardi.</p>';
    }
}