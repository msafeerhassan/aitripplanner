// Chat Interface Elements
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');
const promptButtons = document.querySelectorAll('.prompt-btn');
const tripResults = document.getElementById('tripResults');
const newTripBtn = document.querySelector('.new-trip-btn');

// API Configuration
const GEMINI_API_CONFIG = {
    apiKey: 'YOUR API KEY', // Replace with your actual API key
    model: 'gemini-1.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};

// Event Listeners
chatSend.addEventListener('click', handleChatSubmit);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChatSubmit();
    }
});

// Auto-resize textarea
chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
});

// Handle quick prompt buttons
promptButtons.forEach(button => {
    button.addEventListener('click', () => {
        chatInput.value = button.textContent;
        handleChatSubmit();
    });
});

// Handle new trip button
if (newTripBtn) {
    newTripBtn.addEventListener('click', () => {
        tripResults.style.display = 'none';
        chatInput.value = '';
        chatInput.focus();
    });
}

// Main chat submission handler
async function handleChatSubmit() {
    const message = chatInput.value.trim();
    if (!message) {
        showNotification('Please enter your trip preferences.', 'warning');
        return;
    }

    if (!validateTripRequest(message)) {
        return;
    }

    // Show loading state
    setLoadingState(true);
    
    try {
        await planTrip(message);
        chatInput.value = '';
    } catch (error) {
        console.error('Error in chat submission:', error);
        showNotification('Sorry, there was an error. Please try again.', 'error');
    } finally {
        setLoadingState(false);
    }
}

// Set loading state
function setLoadingState(isLoading) {
    chatInput.disabled = isLoading;
    chatSend.disabled = isLoading;
    
    if (isLoading) {
        chatSend.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        chatInput.placeholder = 'AI is planning your trip...';
    } else {
        chatSend.innerHTML = '<i class="fas fa-paper-plane"></i>';
        chatInput.placeholder = 'Describe your dream trip...';
    }
}

// Trip planning function with Gemini API
async function planTrip(userInput) {
    console.log('Planning trip with input:', userInput);
    
    try {
        showNotification('AI is working on your itinerary...', 'info');
        
        // Call actual Gemini API
        const response = await callGeminiAPI(userInput);
        
        // Parse and display the response
        const tripPlan = parseGeminiResponse(response);
        displayTripPlan(tripPlan);
        showNotification('Trip plan generated successfully! 🎉', 'success');
        
        // Save to preferences
        saveUserPreferences({ lastSearch: userInput, timestamp: Date.now() });
        
    } catch (error) {
        console.error('Error planning trip:', error);
        
        // Fallback to mock response if API fails
        console.log('API failed, using enhanced fallback response');
        const mockResponse = generateEnhancedMockResponse(userInput);
        displayTripPlan(mockResponse);
        showNotification('Generated sample trip plan (API unavailable)', 'warning');
    }
}

// Function to call Gemini API
async function callGeminiAPI(prompt) {
    if (!GEMINI_API_CONFIG.apiKey || GEMINI_API_CONFIG.apiKey.includes('example')) {
        throw new Error('Please configure your Gemini API key in script.js');
    }

    const enhancedPrompt = `You are an expert AI travel planner with deep knowledge of global destinations, cultures, and travel logistics. Create a comprehensive, personalized trip itinerary based on this request: "${prompt}".

IMPORTANT: Respond ONLY with a valid JSON object (no markdown, no backticks, no additional text) in this exact format:

{
    "destination": "Primary destination name",
    "duration": "Trip duration (e.g., '7 days')",
    "overview": "Engaging 2-3 sentence trip overview",
    "highlights": ["Key highlight 1", "Key highlight 2", "Key highlight 3"],
    "itinerary": [
        {
            "day": 1,
            "title": "Descriptive day title",
            "theme": "Day theme (e.g., Arrival & Orientation)",
            "activities": [
                {
                    "time": "Morning/Afternoon/Evening",
                    "activity": "Detailed activity description",
                    "location": "Specific location",
                    "duration": "Time needed",
                    "cost": "Estimated cost range",
                    "tips": "Practical tips or alternatives",
                    "difficulty": "Easy/Moderate/Challenging"
                }
            ]
        }
    ],
    "budget": {
        "accommodation": {"range": "Price range", "description": "Cost breakdown"},
        "meals": {"range": "Price range", "description": "Dining costs"},
        "activities": {"range": "Price range", "description": "Activity costs"},
        "transportation": {"range": "Price range", "description": "Transport costs"},
        "total": {"daily": "Daily estimate", "trip": "Total trip cost"}
    },
    "accommodations": [
        {
            "category": "Luxury/Mid-range/Budget",
            "name": "Specific hotel/accommodation name",
            "location": "Area/neighborhood",
            "price": "Price range per night",
            "amenities": ["Amenity 1", "Amenity 2"],
            "rating": "Star rating or score",
            "description": "Brief description and why recommended"
        }
    ],
    "restaurants": [
        {
            "category": "Fine Dining/Local/Casual/Street Food",
            "name": "Restaurant name",
            "cuisine": "Cuisine type",
            "location": "Area/address",
            "priceRange": "Price range",
            "specialty": "Must-try dish",
            "atmosphere": "Dining atmosphere description"
        }
    ],
    "transportation": {
        "airport": {"options": ["Option 1", "Option 2"], "cost": "Cost range", "tips": "Practical advice"},
        "local": {"primary": "Main transport method", "options": ["Alt 1", "Alt 2"], "cost": "Daily cost"},
        "intercity": {"method": "If applicable", "cost": "Cost", "duration": "Travel time"},
        "tips": ["Transportation tip 1", "Transportation tip 2"]
    },
    "packing": {
        "essentials": ["Essential item 1", "Essential item 2"],
        "clothing": ["Clothing item 1", "Clothing item 2"],
        "electronics": ["Electronic item 1", "Electronic item 2"],
        "documents": ["Document 1", "Document 2"]
    },
    "tips": {
        "cultural": ["Cultural tip 1", "Cultural tip 2"],
        "practical": ["Practical tip 1", "Practical tip 2"],
        "safety": ["Safety tip 1", "Safety tip 2"],
        "money": ["Money tip 1", "Money tip 2"]
    },
    "bestTime": {
        "season": "Recommended season",
        "months": ["Month 1", "Month 2"],
        "reason": "Why this timing is best"
    },
    "weather": {
        "climate": "General climate description",
        "temperature": "Temperature range",
        "rainfall": "Rainfall information",
        "whatToBring": ["Weather-specific item 1", "Weather-specific item 2"]
    },
    "language": {
        "primary": "Primary language",
        "phrases": {
            "hello": "Local greeting",
            "thankyou": "Thank you",
            "excuse_me": "Excuse me",
            "help": "Help"
        }
    },
    "currency": {
        "name": "Currency name",
        "symbol": "Currency symbol",
        "exchangeRate": "Approximate rate",
        "paymentTips": ["Payment tip 1", "Payment tip 2"]
    }
}

Make the response specific, detailed, and actionable. Consider the user's preferences, budget hints, and travel style from their request.`;

    const requestBody = {
        contents: [{
            parts: [{
                text: enhancedPrompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
        }
    };

    try {
        const response = await fetch(`${GEMINI_API_CONFIG.endpoint}?key=${GEMINI_API_CONFIG.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API call failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const responseText = data.candidates[0].content.parts[0].text.trim();
        
        // Clean the response (remove markdown formatting if present)
        const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        try {
            return JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.warn('Response is not valid JSON:', parseError);
            console.log('Raw response:', responseText);
            throw new Error('API returned invalid JSON format');
        }
        
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

// Parse Gemini response
function parseGeminiResponse(response) {
    return {
        type: 'json',
        content: response
    };
}

// Enhanced mock response for fallback
function generateEnhancedMockResponse(userInput) {
    const destinations = ['Paris', 'Tokyo', 'New York', 'London', 'Barcelona', 'Dubai'];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    
    return {
        type: 'json',
        content: {
            destination: randomDestination,
            duration: "5 days",
            overview: `An amazing ${randomDestination} adventure tailored to your request: "${userInput}". Experience the perfect blend of culture, cuisine, and unforgettable moments.`,
            highlights: ["Iconic landmarks and attractions", "Authentic local cuisine experiences", "Cultural immersion opportunities"],
            itinerary: [
                {
                    day: 1,
                    title: "Arrival & First Impressions",
                    theme: "Getting Oriented",
                    activities: [
                        {
                            time: "Morning",
                            activity: "Airport arrival and hotel check-in",
                            location: "City Center",
                            duration: "2-3 hours",
                            cost: "$50-80",
                            tips: "Book airport transfer in advance for better rates",
                            difficulty: "Easy"
                        },
                        {
                            time: "Afternoon",
                            activity: "Walking tour of historic district",
                            location: "Old Town",
                            duration: "3 hours",
                            cost: "$30-50",
                            tips: "Wear comfortable shoes and bring water",
                            difficulty: "Easy"
                        }
                    ]
                },
                {
                    day: 2,
                    title: "Cultural Deep Dive",
                    theme: "History & Heritage",
                    activities: [
                        {
                            time: "Morning",
                            activity: "Visit world-famous museum",
                            location: "Museum District",
                            duration: "3 hours",
                            cost: "$25-40",
                            tips: "Book tickets online to skip lines",
                            difficulty: "Easy"
                        }
                    ]
                }
            ],
            budget: {
                accommodation: {range: "$100-200/night", description: "Mid-range hotels with good amenities"},
                meals: {range: "$60-100/day", description: "Mix of local and international dining"},
                activities: {range: "$80-150/day", description: "Tours, museums, and experiences"},
                transportation: {range: "$30-60/day", description: "Metro, taxis, and local transport"},
                total: {daily: "$270-510", trip: "$1,350-2,550"}
            },
            accommodations: [
                {
                    category: "Mid-range",
                    name: "Central Plaza Hotel",
                    location: "City Center",
                    price: "$120-180/night",
                    amenities: ["Free WiFi", "Breakfast included", "24h reception"],
                    rating: "4.2/5",
                    description: "Perfect location with modern amenities and excellent service"
                }
            ],
            restaurants: [
                {
                    category: "Local",
                    name: "Traditional Flavors Bistro",
                    cuisine: "Local specialties",
                    location: "Historic Quarter",
                    priceRange: "$25-45/person",
                    specialty: "Signature local dish",
                    atmosphere: "Cozy, authentic local dining experience"
                }
            ],
            transportation: {
                airport: {
                    options: ["Metro", "Taxi", "Ride-share"],
                    cost: "$15-50",
                    tips: "Metro is cheapest, taxi most convenient"
                },
                local: {
                    primary: "Metro system",
                    options: ["Metro", "Bus", "Walking", "Bike-share"],
                    cost: "$8-15/day"
                },
                intercity: {method: "N/A", cost: "N/A", duration: "N/A"},
                tips: ["Get a transit card for discounts", "Download the local transport app"]
            },
            packing: {
                essentials: ["Comfortable walking shoes", "Weather-appropriate clothing"],
                clothing: ["Layers for variable weather", "Nice outfit for dining"],
                electronics: ["Phone charger", "Portable battery", "Camera"],
                documents: ["Passport", "Travel insurance", "Hotel confirmations"]
            },
            tips: {
                cultural: ["Learn basic greetings in local language", "Respect local customs and dress codes"],
                practical: ["Keep copies of important documents", "Download offline maps"],
                safety: ["Stay aware of surroundings", "Keep valuables secure"],
                money: ["Notify bank of travel", "Have some local cash"]
            },
            bestTime: {
                season: "Spring/Fall",
                months: ["April", "May", "September", "October"],
                reason: "Perfect weather and fewer crowds"
            },
            weather: {
                climate: "Temperate with distinct seasons",
                temperature: "15-25°C (59-77°F)",
                rainfall: "Moderate, occasional showers",
                whatToBring: ["Light rain jacket", "Comfortable layers"]
            },
            language: {
                primary: "Local Language",
                phrases: {
                    hello: "Hello",
                    thankyou: "Thank you",
                    excuse_me: "Excuse me",
                    help: "Help"
                }
            },
            currency: {
                name: "Local Currency",
                symbol: "$",
                exchangeRate: "1 USD = 1.00 Local",
                paymentTips: ["Cards widely accepted", "Keep some cash for small vendors"]
            }
        }
    };
}

// Enhanced display function for JSON responses
function displayTripPlan(tripPlan) {
    const tripContent = document.querySelector('.trip-content');
    
    if (tripPlan.type === 'json') {
        tripContent.innerHTML = renderJSONTripPlan(tripPlan.content);
    } else {
        tripContent.innerHTML = `<pre>${tripPlan.content}</pre>`;
    }
    
    tripResults.style.display = 'block';
    
    // Smooth scroll to results
    setTimeout(() => {
        tripResults.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// Render JSON trip plan as beautiful HTML
function renderJSONTripPlan(data) {
    return `
        <div class="trip-plan-container">
            <!-- Header Section -->
            <div class="trip-header-section">
                <div class="destination-card">
                    <h2 class="destination-name">${data.destination}</h2>
                    <div class="trip-meta">
                        <span class="duration">${data.duration}</span>
                        <span class="separator">•</span>
                        <span class="best-time">${data.bestTime?.season || 'Year-round'}</span>
                    </div>
                    <p class="trip-overview">${data.overview}</p>
                </div>
                
                ${data.highlights ? `
                <div class="highlights-section">
                    <h3>Trip Highlights</h3>
                    <div class="highlights-grid">
                        ${data.highlights.map(highlight => `
                            <div class="highlight-item">
                                <i class="fas fa-star"></i>
                                <span>${highlight}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>

            <!-- Itinerary Section -->
            <div class="itinerary-section">
                <h3><i class="fas fa-calendar-alt"></i> Daily Itinerary</h3>
                <div class="itinerary-timeline">
                    ${data.itinerary.map(day => `
                        <div class="day-card">
                            <div class="day-header">
                                <div class="day-number">Day ${day.day}</div>
                                <div class="day-info">
                                    <h4>${day.title}</h4>
                                    ${day.theme ? `<span class="day-theme">${day.theme}</span>` : ''}
                                </div>
                            </div>
                            <div class="activities-list">
                                ${day.activities.map(activity => `
                                    <div class="activity-item">
                                        <div class="activity-time">${activity.time}</div>
                                        <div class="activity-content">
                                            <h5>${activity.activity}</h5>
                                            <div class="activity-details">
                                                <span class="location"><i class="fas fa-map-marker-alt"></i> ${activity.location}</span>
                                                <span class="duration"><i class="fas fa-clock"></i> ${activity.duration}</span>
                                                <span class="cost"><i class="fas fa-dollar-sign"></i> ${activity.cost}</span>
                                            </div>
                                            ${activity.tips ? `<p class="activity-tips"><i class="fas fa-lightbulb"></i> ${activity.tips}</p>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Budget Section -->
            <div class="budget-section">
                <h3><i class="fas fa-wallet"></i> Budget Breakdown</h3>
                <div class="budget-grid">
                    <div class="budget-item">
                        <div class="budget-icon"><i class="fas fa-bed"></i></div>
                        <div class="budget-info">
                            <h4>Accommodation</h4>
                            <span class="budget-amount">${data.budget.accommodation.range}</span>
                            <p>${data.budget.accommodation.description}</p>
                        </div>
                    </div>
                    <div class="budget-item">
                        <div class="budget-icon"><i class="fas fa-utensils"></i></div>
                        <div class="budget-info">
                            <h4>Meals</h4>
                            <span class="budget-amount">${data.budget.meals.range}</span>
                            <p>${data.budget.meals.description}</p>
                        </div>
                    </div>
                    <div class="budget-item">
                        <div class="budget-icon"><i class="fas fa-camera"></i></div>
                        <div class="budget-info">
                            <h4>Activities</h4>
                            <span class="budget-amount">${data.budget.activities.range}</span>
                            <p>${data.budget.activities.description}</p>
                        </div>
                    </div>
                    <div class="budget-item">
                        <div class="budget-icon"><i class="fas fa-car"></i></div>
                        <div class="budget-info">
                            <h4>Transportation</h4>
                            <span class="budget-amount">${data.budget.transportation.range}</span>
                            <p>${data.budget.transportation.description}</p>
                        </div>
                    </div>
                </div>
                <div class="budget-total">
                    <h4>Total Estimated Cost</h4>
                    <div class="total-amounts">
                        <span class="daily-total">Daily: ${data.budget.total.daily}</span>
                        <span class="trip-total">Trip: ${data.budget.total.trip}</span>
                    </div>
                </div>
            </div>

            <!-- Accommodations Section -->
            ${data.accommodations ? `
            <div class="accommodations-section">
                <h3><i class="fas fa-hotel"></i> Recommended Accommodations</h3>
                <div class="accommodations-grid">
                    ${data.accommodations.map(hotel => `
                        <div class="accommodation-card">
                            <div class="accommodation-header">
                                <h4>${hotel.name}</h4>
                                <span class="category-badge">${hotel.category}</span>
                            </div>
                            <div class="accommodation-details">
                                <p class="location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                                <p class="price"><i class="fas fa-tag"></i> ${hotel.price}</p>
                                <p class="rating"><i class="fas fa-star"></i> ${hotel.rating}</p>
                            </div>
                            <p class="description">${hotel.description}</p>
                            ${hotel.amenities ? `
                            <div class="amenities">
                                ${hotel.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                            </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Restaurants Section -->
            ${data.restaurants ? `
            <div class="restaurants-section">
                <h3><i class="fas fa-restaurant"></i> Must-Try Restaurants</h3>
                <div class="restaurants-grid">
                    ${data.restaurants.map(restaurant => `
                        <div class="restaurant-card">
                            <div class="restaurant-header">
                                <h4>${restaurant.name}</h4>
                                <span class="category-badge">${restaurant.category}</span>
                            </div>
                            <div class="restaurant-details">
                                <p><i class="fas fa-utensils"></i> ${restaurant.cuisine}</p>
                                <p><i class="fas fa-map-marker-alt"></i> ${restaurant.location}</p>
                                <p><i class="fas fa-dollar-sign"></i> ${restaurant.priceRange}</p>
                            </div>
                            <p><strong>Must-try:</strong> ${restaurant.specialty}</p>
                            <p class="atmosphere">${restaurant.atmosphere}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Tips Section -->
            ${data.tips ? `
            <div class="tips-section">
                <h3><i class="fas fa-lightbulb"></i> Insider Tips</h3>
                <div class="tips-grid">
                    <div class="tips-category">
                        <h4><i class="fas fa-users"></i> Cultural Tips</h4>
                        <ul>
                            ${data.tips.cultural.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tips-category">
                        <h4><i class="fas fa-tools"></i> Practical Tips</h4>
                        <ul>
                            ${data.tips.practical.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tips-category">
                        <h4><i class="fas fa-shield-alt"></i> Safety Tips</h4>
                        <ul>
                            ${data.tips.safety.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tips-category">
                        <h4><i class="fas fa-money-bill"></i> Money Tips</h4>
                        <ul>
                            ${data.tips.money.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Practical Info Section -->
            <div class="practical-info-section">
                <h3><i class="fas fa-info-circle"></i> Practical Information</h3>
                <div class="practical-grid">
                    ${data.weather ? `
                    <div class="info-card">
                        <h4><i class="fas fa-cloud-sun"></i> Weather</h4>
                        <p><strong>Climate:</strong> ${data.weather.climate}</p>
                        <p><strong>Temperature:</strong> ${data.weather.temperature}</p>
                        <p><strong>Rainfall:</strong> ${data.weather.rainfall}</p>
                    </div>
                    ` : ''}
                    
                    ${data.currency ? `
                    <div class="info-card">
                        <h4><i class="fas fa-coins"></i> Currency</h4>
                        <p><strong>Currency:</strong> ${data.currency.name} (${data.currency.symbol})</p>
                        <p><strong>Exchange Rate:</strong> ${data.currency.exchangeRate}</p>
                    </div>
                    ` : ''}
                    
                    ${data.language ? `
                    <div class="info-card">
                        <h4><i class="fas fa-language"></i> Language</h4>
                        <p><strong>Primary:</strong> ${data.language.primary}</p>
                        <div class="phrases">
                            ${Object.entries(data.language.phrases).map(([key, phrase]) => 
                                `<span class="phrase"><strong>${key.replace('_', ' ')}:</strong> ${phrase}</span>`
                            ).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Form validation
function validateTripRequest(input) {
    if (input.length < 5) {
        showNotification('Please provide more details about your trip preferences.', 'warning');
        return false;
    }
    return true;
}

// Local storage for user preferences
function saveUserPreferences(preferences) {
    const existing = getUserPreferences();
    const updated = { ...existing, ...preferences };
    localStorage.setItem('tripPlannerPreferences', JSON.stringify(updated));
}

function getUserPreferences() {
    const saved = localStorage.getItem('tripPlannerPreferences');
    return saved ? JSON.parse(saved) : {};
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Trip Planner initialized');
    
    // Load user preferences
    const userPrefs = getUserPreferences();
    if (userPrefs.lastSearch) {
        chatInput.placeholder = `Try: "${userPrefs.lastSearch}" or describe your dream trip...`;
    }
    
    // Focus on input
    chatInput.focus();
});

// Export functions for potential module usage
window.TripPlanner = {
    planTrip,
    callGeminiAPI,
    displayTripPlan,
    showNotification,
    setLoadingState
};
