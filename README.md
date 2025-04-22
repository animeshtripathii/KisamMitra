# 🌱 KisanMitra - Farmer's Friend

A comprehensive website focused on Indian agriculture, providing farmers with tools, information, and AI assistance.

## 🚀 Features
- 🌾 Modern, responsive design with smooth animations  
- 👨‍🌾 Farmer profiles showcasing success stories  
- 📊 Animated statistics section with counter effects  
- 💬 Testimonials carousel with reviews from farmers  
- ☁️ Real-time weather forecasting with farming tips  
- 🤖 Interactive AI chatbot with voice input/output capabilities  
- 🌐 Bilingual support (Hindi and English)  

## 🔗 Demo
[[View KisanMitra Demo](https://kisan-mitra-ashy.vercel.app/)](#) <!-- Replace '#' with actual demo URL -->

## 🛠️ Setup and Installation

1. Clone this repository or download the ZIP file.
2. Add required images to the `images` folder (see below).
3. Open `js/weather.js` and add your **OpenWeatherMap API key**.
4. Open `js/gemini-api.js` and add your **Google Gemini API key**.
5. Open `index.html` in your browser or deploy to a web server.

## 📁 Required Images

Add these files to the `images/` directory:

- `logo.png`
- `hero-farming.png`
- `farming-technology.png`
- `sustainable-farming.png`
- `farming-bg.jpg`
- `farming-ai.jpg`
- `leaf-pattern.png`
- `farmer1.jpg`, `farmer2.jpg`, `farmer3.jpg`, `farmer4.jpg`
- `review1.jpg`, `review2.jpg`, `review3.jpg`
- `about-1.jpg`, `about-2.jpg`, `about-3.jpg`, `about-4.jpg`
- `google-play-badge.png`, `app-store-badge.png`

## 🔑 Getting an API Key

### 🌤 OpenWeatherMap API

1. Visit [OpenWeatherMap](https://openweathermap.org/) and create an account.
2. Subscribe to the **Current Weather Data** API (free tier available).
3. Copy your API key and paste it into `js/weather.js`.

### 🧠 Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/).
2. Create an API key from the **API Keys** section.
3. Paste your key into `js/gemini-api.js`.

## 🧩 Chatbot Configuration

The chatbot is configured to provide farming-related answers. You can modify the prompt in `js/gemini-api.js` to target specific agricultural domains or issues.

## 🎙️ Voice Support

- Click the **microphone button** to speak to the chatbot.  
- The chatbot will respond with **text and speech** output.  
- Works best in **Google Chrome** and modern browsers.

## 🧪 Technologies Used

- HTML5, CSS3, JavaScript  
- TailwindCSS  
- Font Awesome  
- Google Fonts  
- OpenWeatherMap API  
- Google Gemini API  
- Web Speech API  

## 🎨 Customization

- Change colors via `:root` variables in `css/styles.css`
- Update farming tips in the `farmingTips` object in `js/weather.js`
- Customize chatbot logic/prompt in `js/gemini-api.js`

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 🙌 Credits

- Weather icons by [Font Awesome](https://fontawesome.com/)
- Background patterns created with CSS
- Special thanks to Indian agricultural experts for content guidance
