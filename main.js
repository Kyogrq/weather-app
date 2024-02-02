// API key for OpenWeatherMap
const apiKey = 'ENTER YOUR API KEY';

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update the weather information and background video on the webpage
async function updateWeatherAndBackground(city) {
    try {
        const weatherData = await getWeatherData(city);
        updateWeatherUI(weatherData);
        updateBackgroundVideo(weatherData.weather[0].main);
    } catch (error) {
        console.error('Error updating weather and background:', error);
    }
}

// Function to update the weather information on the webpage
function updateWeatherUI(data) {
    const weatherContainer = document.querySelector('.weather-container');
    if (data) {
        const weatherHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherContainer.innerHTML = weatherHTML;
        document.querySelector('.weather-info').classList.add('show');
        document.querySelector('.background-video').style.display = 'block';
    } else {
        weatherContainer.innerHTML = '<p>Weather data not available</p>';
    }
}

// Function to update the background video based on weather condition
function updateBackgroundVideo(weatherCondition) {
    const videoElement = document.querySelector('.background-video');

    // Define the URLs of the background videos for different weather conditions
    const videos = {
        'Rain': 'assets/rain.mp4',
        'Clouds': 'assets/cloudy.mp4',
        'Snow': 'assets/snow.mp4'
    };

    // Check if the weather condition exists in the videos object
    if (weatherCondition in videos) {
        const videoUrl = videos[weatherCondition];
        videoElement.src = videoUrl;
        videoElement.classList.add('show'); // Show the background video
    }
}

// Function to handle button click event
async function handleClick() {
    const city = "Dublin"; // Set accordingly or make a prompt thingy idk
    if (city) {
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.classList.add('container-hidden');
        });
        await updateWeatherAndBackground(city);
    }
}

// Event listener for the weather button
const weatherButton = document.querySelector('.weather-button-hidden');
weatherButton.addEventListener('click', handleClick);
