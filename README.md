# 🛫 AI Trip Planner

A modern, AI-powered trip planning web application built with the Google Gemini API. Plan your perfect trip with intelligent recommendations, detailed itineraries, and comprehensive travel information.

## ✨ Features

- **Smart AI Planning**: Powered by Google Gemini API for intelligent trip recommendations
- **Interactive Chat Interface**: Natural language trip planning with quick prompt buttons
- **Comprehensive Trip Plans**: Detailed daily itineraries, budget breakdowns, and practical tips
- **Modern UI**: Beautiful glassmorphism design with smooth animations and responsive layout
- **Rich Information**: Accommodations, restaurants, transportation, weather, packing lists, and more
- **Offline Fallback**: Enhanced mock responses when API is unavailable
- **Local Storage**: Saves user preferences and trip history

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Get a Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Set up your API key** using one of these methods:

### Method 1: Environment Variable (Recommended)
```bash
# Create a .env file (copy from .env.example)
cp .env.example .env

# Edit .env and add your API key
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Method 2: Config File
```javascript
// Create a config.js file or edit the existing one
window.ENV = {
    GEMINI_API_KEY: 'your_actual_gemini_api_key_here'
};
```

### Method 3: Direct Configuration
```javascript
// Edit config.js and uncomment the last line
window.ENV.GEMINI_API_KEY = 'your_api_key_here';
```

4. **Open `index.html`** in your browser or serve via HTTP server

### Running Locally

```bash
# Using Python (recommended)
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using npm (if you have package.json dependencies)
npm install
npm start
```

Visit `http://localhost:8000` in your browser.

## � Usage

1. **Enter your trip preferences** in natural language
2. **Use quick prompts** for instant examples
3. **Get comprehensive trip plans** with:
   - Daily itineraries with specific activities
   - Budget estimates and cost breakdowns
   - Hotel and restaurant recommendations
   - Transportation options and tips
   - Cultural and practical advice
   - Weather information and packing lists

### Example Prompts

- "5-day trip to Italy under $3000"
- "Adventure backpacking through Southeast Asia"
- "Family vacation to Japan with kids"
- "Solo luxury weekend in Dubai"
- "Cultural tour of India on a budget"

## 🎨 Features Overview

### AI-Powered Planning
- **Gemini Integration**: Advanced AI for personalized recommendations
- **JSON Responses**: Structured, detailed trip information
- **Smart Fallback**: Works offline with enhanced mock data

### Beautiful Interface
- **Glassmorphism Design**: Modern, translucent UI elements
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Engaging micro-interactions
- **Dark/Light Themes**: Automatic adaptation

### Comprehensive Results
- **Daily Itineraries**: Hour-by-hour activity planning
- **Budget Planning**: Detailed cost estimates by category
- **Accommodation Guides**: Hotel recommendations with ratings
- **Dining Suggestions**: Restaurant recommendations by cuisine
- **Transportation Info**: Local and intercity travel options
- **Cultural Tips**: Local customs and etiquette
- **Practical Advice**: Safety, money, and packing tips

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Integration**: Google Gemini API
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

### File Structure
```
aitripplanner/
├── index.html          # Main application page
├── styles.css          # Advanced styling and animations
├── script.js           # AI integration and UI logic
├── package.json        # Project configuration
└── README.md           # This file
```

### API Integration
The app uses the Google Gemini API with:
- **Advanced prompting** for structured JSON responses
- **Error handling** with graceful fallbacks
- **Rate limiting** awareness
- **Response validation** and cleaning

### API Key Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Replace in `script.js`:
   ```javascript
   const GEMINI_API_CONFIG = {
       apiKey: 'YOUR_ACTUAL_API_KEY_HERE', // Replace this
       model: 'gemini-pro',
       endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
   };
   ```

### Customization Options
- **Styling**: Modify `styles.css` for custom themes
- **Prompts**: Update quick prompt buttons in `index.html`
- **Responses**: Enhance mock responses in `script.js`
- **Features**: Add new sections to the trip plan template

## 🐛 Troubleshooting

### Common Issues
1. **API Key Error**: Ensure your Gemini API key is valid and properly set
2. **CORS Issues**: Serve via HTTP server, don't open HTML directly
3. **Mobile Issues**: Test responsive design on actual devices
4. **Loading Problems**: Check browser console for JavaScript errors

### Browser Support
- ✅ Chrome/Chromium (88+)
- ✅ Firefox (85+)
- ✅ Safari (14+)
- ✅ Edge (88+)

## 📝 License

MIT License - feel free to use and modify for your projects.

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines and submit pull requests.

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Ensure API key is properly configured
4. Test with mock responses first

---

**Built with ❤️ using Google Gemini AI**
- **Fonts**: Inter (Google Fonts)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd aitripplanner
```

### 2. Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key for the next step

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Update JavaScript Configuration
In `script.js`, update the API key:
```javascript
const GEMINI_API_CONFIG = {
    apiKey: 'your_api_key_here', // Replace with your actual API key
    model: 'gemini-pro',
    endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'
};
```

### 5. Local Development
Simply open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

### 6. Deploy to Vercel

#### Method 1: Via GitHub (Recommended)
1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Import your repository
4. Add environment variables:
   - Go to your project Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your actual API key
   - Deploy!

#### Method 2: Via Vercel CLI
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables:
```bash
vercel env add GEMINI_API_KEY
# Enter your API key when prompted
```

4. Redeploy to apply the environment variables:
```bash
vercel --prod
```

#### Important: Environment Variables on Vercel
- The project now uses a serverless API route (`/api/gemini.js`) to securely handle API calls
- Your `GEMINI_API_KEY` must be set in Vercel's environment variables
- Never commit your actual API key to the repository

## Project Structure

```
aitripplanner/
├── api/
│   └── gemini.js       # Vercel serverless function for API calls
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── config.js           # Configuration loader
├── vercel.json         # Vercel deployment configuration
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
├── .env.example        # Environment variables template
└── .env               # Environment variables (create this, not in git)
```

## Features Implementation Status

### ✅ Completed
- [x] Responsive HTML structure
- [x] Modern CSS styling
- [x] JavaScript interactivity
- [x] Chat interface UI
- [x] Mobile navigation
- [x] Notification system
- [x] Gemini API integration setup

### 🚧 In Progress
- [ ] Complete Gemini API integration
- [ ] Trip plan display UI
- [ ] User preferences storage
- [ ] Advanced form validation

### 📋 Planned
- [ ] User authentication
- [ ] Trip saving/sharing
- [ ] Map integration
- [ ] Booking system integration
- [ ] Payment processing
- [ ] Advanced filtering options

## API Integration

The app uses Google's Gemini API for intelligent trip planning. The API call structure:

```javascript
const requestBody = {
    contents: [{
        parts: [{
            text: "Travel planning prompt..."
        }]
    }],
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
    }
};
```

## Customization

### Colors
Main color scheme can be modified in `styles.css`:
- Primary: `#2563eb` (Blue)
- Secondary: `#64748b` (Gray)
- Success: `#059669` (Green)
- Error: `#dc2626` (Red)

### Fonts
Current font: Inter from Google Fonts. Can be changed in the HTML head section.

### Layout
The layout uses CSS Grid and Flexbox for responsive design. Main breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Roadmap

### Phase 1: Core Functionality ✅
- Basic UI/UX
- Gemini API integration
- Trip planning interface

### Phase 2: Enhanced Features 🚧
- User accounts
- Trip saving
- Social sharing

### Phase 3: Advanced Features 📋
- Real-time booking
- Payment integration
- Mobile app

---

**Happy Travel Planning! ✈️**
