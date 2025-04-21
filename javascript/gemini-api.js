// Google Generative AI (Gemini) API Integration
const GEMINI_API_KEY = "AIzaSyAO2klmW4WMY8mME5qyIhfAhoSGEX4gx4g";
const GEMINI_MODEL = "gemini-2.0-flash";

// Function to get response from Gemini API
async function getGeminiResponse(prompt) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are KisanMitra, a farming assistant specialized in Indian agriculture. 
                        Provide helpful, concise advice about farming techniques, crop selection, pest management, 
                        weather considerations, and market information. Use simple language and keep responses under 150 words.
                        
                        User question: ${prompt}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        // Check if there's a valid response
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            console.error("Gemini API Error:", data.error);
            return "I'm having trouble connecting to my knowledge base. Please try again or ask another question.";
        } else {
            return "I couldn't generate a response for that question. Could you try rephrasing it?";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error. Please try again later.";
    }
}


window.getGeminiResponse = getGeminiResponse;
