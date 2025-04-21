# KisanMitra - Farmer's Friend

A comprehensive website focused on Indian agriculture, providing farmers with tools, information, and AI assistance.

## Features

- Modern, responsive design with smooth animations
- Farmer profiles showcasing success stories
- Animated statistics section with counter effects
- Testimonials carousel with reviews from farmers
- Real-time weather forecasting with farming tips
- Interactive AI chatbot with voice input/output capabilities
- Bilingual support (Hindi and English)

## Demo

![KisanMitra Demo](images/screenshot.png)

## Setup and Installation

1. Clone this repository or download the ZIP file
2. Add your own images to the `images` folder (see Required Images section below)
3. Open `js/weather.js` and add your OpenWeatherMap API key
4. Open `js/gemini-api.js` and add your Google Gemini API key
5. Open `index.html` in your browser or deploy to a web server

## Required Images

You'll need to add the following images to the `images` folder:

- `logo.png` - KisanMitra logo
- `hero-farming.png` - Main hero image
- `farming-technology.png` - Farming technology image
- `sustainable-farming.png` - Sustainable farming image
- `farming-bg.jpg` - Hero section background
- `farming-ai.jpg` - AI section image
- `leaf-pattern.png` - Background pattern for statistics
- `farmer1.jpg`, `farmer2.jpg`, `farmer3.jpg`, `farmer4.jpg` - Farmer profile images
- `review1.jpg`, `review2.jpg`, `review3.jpg` - Reviewer profile images
- `about-1.jpg`, `about-2.jpg`, `about-3.jpg`, `about-4.jpg` - About section images
- `google-play-badge.png`, `app-store-badge.png` - App store badges

## Getting an API Key

### OpenWeatherMap API
1. Go to [OpenWeatherMap](https://openweathermap.org/api) and create an account
2. Subscribe to the "Current Weather Data" API (free tier available)
3. Copy your API key and paste it in `js/weather.js`

### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/) and create an account
2. Create a new API key from the API Keys section
3. Copy your API key and paste it in `js/gemini-api.js`

## Chatbot Configuration

The AI chatbot is configured to provide farming-related information. You can customize the prompt in `js/gemini-api.js` to focus on specific agricultural topics relevant to your target audience.

## Voice Support

The website includes voice input and output features:
- Click the microphone button to speak to the chatbot
- The chatbot will read responses aloud
- Voice features work best in Chrome and other modern browsers

## Technologies Used

- HTML5, CSS3, JavaScript
- TailwindCSS for styling
- Font Awesome for icons
- Google Fonts for typography
- OpenWeatherMap API for weather data
- Google Gemini API for AI chatbot
- Web Speech API for voice input/output

## Customization

- Update color scheme in the `:root` variables in `css/styles.css`
- Modify farming tips in the `farmingTips` object in `js/weather.js`
- Change chatbot prompt in `js/gemini-api.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Weather icons by Font Awesome
- Background patterns created with CSS
- Special thanks to Indian agricultural experts for content guidance 