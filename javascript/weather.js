// KisanMitra Weather Module

// Weather Module
const weatherModule = (function() {
    // Constants and DOM Elements
    const WEATHER_API_KEY = config.weatherApiKey;

    // DOM elements
    const locationInput = document.getElementById('location-input');
    const searchButton = document.getElementById('search-button');
    const weatherMain = document.getElementById('weather-main');
    const weatherForecast = document.getElementById('weather-forecast');
    const weatherTipsList = document.getElementById('weather-tips-list');

    // Weather icons mapping
    const weatherIcons = {
      '01d': 'fa-sun',            // clear sky day
      '01n': 'fa-moon',           // clear sky night
      '02d': 'fa-cloud-sun',      // few clouds day
      '02n': 'fa-cloud-moon',     // few clouds night
      '03d': 'fa-cloud',          // scattered clouds
      '03n': 'fa-cloud',
      '04d': 'fa-cloud',          // broken clouds
      '04n': 'fa-cloud',
      '09d': 'fa-cloud-showers-heavy', // shower rain
      '09n': 'fa-cloud-showers-heavy',
      '10d': 'fa-cloud-sun-rain', // rain day
      '10n': 'fa-cloud-moon-rain', // rain night
      '11d': 'fa-bolt',           // thunderstorm
      '11n': 'fa-bolt',
      '13d': 'fa-snowflake',      // snow
      '13n': 'fa-snowflake',
      '50d': 'fa-smog',           // mist
      '50n': 'fa-smog'
    };

    // Farming tips based on weather condition
    const farmingTips = {
      'Clear': [
        'Perfect day for harvesting crops',
        'Good time to apply pesticides as it won\'t wash away',
        'Use sunlight for natural drying of harvested grains'
      ],
      'Clouds': [
        'Great conditions for transplanting seedlings',
        'Consider light irrigation if it\'s been cloudy for several days',
        'Good time for field preparation activities'
      ],
      'Rain': [
        'Avoid irrigation, let natural rainfall water your crops',
        'Check drainage systems to prevent waterlogging',
        'Delay fertilizer application until rain stops'
      ],
      'Thunderstorm': [
        'Stay indoors and avoid field work due to lightning risk',
        'Secure loose items on the farm that could blow away',
        'Check for crop damage after the storm passes'
      ],
      'Snow': [
        'Cover sensitive crops to protect from frost',
        'Ensure livestock have warm shelter',
        'Clear snow from greenhouse roofs to prevent collapse'
      ],
      'Mist': [
        'Good conditions for spraying as droplets stick better',
        'Monitor for fungal diseases as humidity is high',
        'Delay harvest until fog clears and crops are dry'
      ],
      'Default': [
        'Check soil moisture before irrigation to save water',
        'Plan your harvesting on clear days to ensure crop quality',
        'Cover young plants if temperatures drop below 10°C'
      ]
    };

    // Event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listener to search button
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const location = locationInput.value.trim();
                if (location) {
                    getWeatherByLocation(location);
                }
            });
        }
        
        // Add event listener to location input for Enter key
        if (locationInput) {
            locationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const location = locationInput.value.trim();
                    if (location) {
                        getWeatherByLocation(location);
                    }
                }
            });
        }

        // Try to get weather for default location (Delhi)
        getWeatherByLocation('Delhi');
    });

    // Get weather by location name
    function getWeatherByLocation(location) {
        // Show loading state
        weatherMain.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-spinner fa-spin text-5xl text-blue-500 mb-4"></i>
                <p class="text-gray-600">Loading weather data...</p>
            </div>
        `;
        weatherForecast.innerHTML = '';

        // Fetch current weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                // Get forecast after current weather
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${WEATHER_API_KEY}`);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Forecast data not available');
                }
                return response.json();
            })
            .then(data => {
                displayForecast(data);
                updateFarmingTips(data.list[0].weather[0].main);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                showWeatherError(error.message);
            });
    }

    // Display current weather
    function displayCurrentWeather(data) {
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        
        let iconClass = weatherIcons[iconCode] || 'fa-cloud';
        
        const html = `
            <div class="text-center p-6 bg-white rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-2">${data.name}, ${data.sys.country}</h3>
                <div class="weather-icon text-6xl mb-4">
                    <i class="fas ${iconClass} text-blue-500"></i>
                </div>
                <div class="weather-temp text-5xl font-bold mb-2">${temp}°C</div>
                <div class="weather-desc text-lg mb-4 capitalize">${weatherDescription}</div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="p-2 bg-gray-50 rounded">
                        <i class="fas fa-temperature-high text-orange-500 mr-1"></i> Feels like: ${feelsLike}°C
                    </div>
                    <div class="p-2 bg-gray-50 rounded">
                        <i class="fas fa-tint text-blue-500 mr-1"></i> Humidity: ${humidity}%
                    </div>
                    <div class="p-2 bg-gray-50 rounded">
                        <i class="fas fa-wind text-gray-500 mr-1"></i> Wind: ${windSpeed} m/s
                    </div>
                    <div class="p-2 bg-gray-50 rounded">
                        <i class="fas fa-sun text-yellow-500 mr-1"></i> UV Index: Moderate
                    </div>
                </div>
            </div>
        `;
        
        weatherMain.innerHTML = html;
    }

    // Display forecast
    function displayForecast(data) {
        // Clear existing forecast
        weatherForecast.innerHTML = '';
        
        // Get one forecast per day (every 8th item is noon of each day)
        const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
        
        const forecastHtml = `
            <div class="mt-6">
                <h4 class="text-lg font-semibold mb-4">5-Day Forecast</h4>
                <div class="grid grid-cols-5 gap-2">
                    ${dailyForecasts.map(forecast => {
                        const date = new Date(forecast.dt * 1000);
                        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
                        const temp = Math.round(forecast.main.temp);
                        const iconCode = forecast.weather[0].icon;
                        const iconClass = weatherIcons[iconCode] || 'fa-cloud';
                        
                        return `
                            <div class="p-3 bg-white rounded-lg shadow-sm text-center">
                                <div class="text-sm font-medium mb-1">${dayName}</div>
                                <div class="text-xl mb-1">
                                    <i class="fas ${iconClass} text-blue-500"></i>
                                </div>
                                <div class="text-lg font-bold">${temp}°C</div>
                                <div class="text-xs text-gray-500">${forecast.weather[0].main}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        weatherForecast.innerHTML = forecastHtml;
    }

    // Show error when weather data cannot be retrieved
    function showWeatherError(message) {
        weatherMain.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-exclamation-circle text-red-500 text-5xl mb-4"></i>
                <p class="text-gray-600">${message || 'Unable to retrieve weather data. Please check your location and try again.'}</p>
            </div>
        `;
        weatherForecast.innerHTML = '';
    }

    // Update farming tips based on weather condition
    function updateFarmingTips(weatherCondition) {
        const tips = {
            'Clear': [
                'Perfect day for harvesting crops',
                'Good time to apply pesticides',
                'Consider irrigation if needed'
            ],
            'Clouds': [
                'Good conditions for transplanting',
                'Monitor soil moisture levels',
                'Ideal for fertilizer application'
            ],
            'Rain': [
                'Avoid chemical spraying',
                'Check drainage systems',
                'Protect harvested crops'
            ],
            'Thunderstorm': [
                'Secure farm equipment',
                'Stay indoors during storm',
                'Check crop damage after storm'
            ],
            'Snow': [
                'Protect crops from frost',
                'Ensure greenhouse heating',
                'Clear snow from structures'
            ],
            'Mist': [
                'Watch for fungal diseases',
                'Delay spraying operations',
                'Monitor crop moisture'
            ],
            'Default': [
                'Monitor crop conditions',
                'Check weather updates regularly',
                'Plan activities accordingly'
            ]
        };

        const selectedTips = tips[weatherCondition] || tips['Default'];
        
        // Update tips in the DOM
        weatherTipsList.innerHTML = selectedTips.map(tip => `
            <li class="mb-2 flex items-start">
                <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                <span>${tip}</span>
            </li>
        `).join('');
    }
})(); 