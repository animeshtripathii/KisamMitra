// KisanMitra Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('nav');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md');
        header.classList.remove('shadow-sm');
      } else {
        header.classList.remove('shadow-md');
        header.classList.add('shadow-sm');
      }
    });
  }
  
  // Hero Carousel
  const carouselImages = document.querySelectorAll('.carousel-image');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentImageIndex = 0;
  
  function showNextImage() {
    carouselImages[currentImageIndex].classList.remove('active');
    carouselDots[currentImageIndex].classList.remove('active');
    
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    
    carouselImages[currentImageIndex].classList.add('active');
    carouselDots[currentImageIndex].classList.add('active');
  }
  
  if (carouselImages.length > 0) {
    setInterval(showNextImage, 5000);
    
    // Add click event listeners to dots
    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        carouselImages[currentImageIndex].classList.remove('active');
        carouselDots[currentImageIndex].classList.remove('active');
        
        currentImageIndex = index;
        
        carouselImages[currentImageIndex].classList.add('active');
        carouselDots[currentImageIndex].classList.add('active');
      });
    });
  }
  
  // Statistics count up animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = Math.ceil(target / (duration / 30)); // Update every 30ms
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          stat.textContent = current.toLocaleString();
        }
      }, 30);
    });
  }
  
  // Use Intersection Observer to trigger counting animation when stats section is visible
  const statsSection = document.querySelector('#statistics');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
  }
  
  // Reviews carousel
  const reviewTrack = document.querySelector('.review-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (reviewTrack) {
    const reviews = document.querySelectorAll('.review-card');
    let currentIndex = 0;
    
    // Create dots
    reviews.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    });
    
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    function goToSlide(index) {
      if (index < 0) index = reviews.length - 1;
      if (index >= reviews.length) index = 0;
      
      currentIndex = index;
      const width = reviews[0].clientWidth;
      reviewTrack.style.transform = `translateX(-${currentIndex * width}px)`;
      updateDots();
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });
    }
    
    // Auto-play
    setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    
    // Make it responsive
    window.addEventListener('resize', () => {
      goToSlide(currentIndex);
    });
  }

  // Chatbot functionality
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotInterface = document.getElementById('chatbot-interface');
  const closeButton = document.getElementById('close-chatbot');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-message');
  const voiceButton = document.getElementById('voice-input');
  const messagesContainer = document.querySelector('.chatbot-messages');
  const chatbotBackdrop = document.getElementById('chatbot-backdrop');
  
  if (chatbotToggle && chatbotInterface) {
    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
      chatbotInterface.classList.add('active');
      chatbotToggle.style.opacity = '0';
      chatbotToggle.style.pointerEvents = 'none';
      if (chatbotBackdrop) chatbotBackdrop.classList.add('active');
      
      // Focus on input field
      setTimeout(() => {
        if (userInput) userInput.focus();
      }, 300);
    });
    
    // Close chatbot
    closeButton.addEventListener('click', function() {
      chatbotInterface.classList.remove('active');
      chatbotToggle.style.opacity = '1';
      chatbotToggle.style.pointerEvents = 'auto';
      if (chatbotBackdrop) chatbotBackdrop.classList.remove('active');
    });
    
    // Close chatbot when clicking on backdrop
    if (chatbotBackdrop) {
      chatbotBackdrop.addEventListener('click', function() {
        chatbotInterface.classList.remove('active');
        chatbotToggle.style.opacity = '1';
        chatbotToggle.style.pointerEvents = 'auto';
        chatbotBackdrop.classList.remove('active');
      });
    }
    
    // Send message on button click
    sendButton.addEventListener('click', function() {
      sendMessage();
    });
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Voice input
    if (voiceButton) {
      voiceButton.addEventListener('click', function() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          
          recognition.lang = 'en-US';
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;
          recognition.start();
          
          // Show visual feedback that recording is active
          voiceButton.innerHTML = '<i class="fas fa-circle"></i>';
          voiceButton.classList.add('listening');
          addMessage('Listening...', 'bot');
          
          recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            
            // Remove the "Listening..." message
            const lastMessage = messagesContainer.lastChild;
            if (lastMessage && lastMessage.querySelector('.message-content p').textContent === 'Listening...') {
              messagesContainer.removeChild(lastMessage);
            }
            
            // Send the recognized speech as a message
            sendMessage();
          };
          
          recognition.onend = function() {
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceButton.classList.remove('listening');
            
            // Remove the "Listening..." message if it's still there
            const messages = messagesContainer.querySelectorAll('.message');
            for (let i = messages.length - 1; i >= 0; i--) {
              if (messages[i].querySelector('.message-content p').textContent === 'Listening...') {
                messagesContainer.removeChild(messages[i]);
                break;
              }
            }
          };
          
          recognition.onerror = function(event) {
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceButton.classList.remove('listening');
            
            // Remove the "Listening..." message
            const messages = messagesContainer.querySelectorAll('.message');
            for (let i = messages.length - 1; i >= 0; i--) {
              if (messages[i].querySelector('.message-content p').textContent === 'Listening...') {
                messagesContainer.removeChild(messages[i]);
                break;
              }
            }
            
            addMessage('Voice recognition failed. Please try again or type your message.', 'bot');
          };
        } else {
          addMessage('Voice recognition is not supported in your browser. Please use Chrome.', 'bot');
        }
      });
    }
    
    function sendMessage() {
      const message = userInput.value.trim();
      if (!message) return;
      
      // Add user message to chat
      addMessage(message, 'user');
      userInput.value = '';
      
      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
      typingIndicator.innerHTML = `
        <div class="message-content">
          <p>Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>
        </div>
      `;
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Get response from Gemini API
      getGeminiResponse(message)
        .then(response => {
          // Remove typing indicator
          messagesContainer.removeChild(typingIndicator);
          
          // Add bot message
          addMessage(response, 'bot');
          
          // Speak response using speech synthesis
          speakText(response);
          
          // Scroll to the most recent message
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        })
        .catch(error => {
          console.error("Error getting response:", error);
          
          // Remove typing indicator
          messagesContainer.removeChild(typingIndicator);
          
          // Add error message
          addMessage("Sorry, I'm having trouble connecting to my knowledge base. Please try again later.", 'bot');
          
          // Scroll to the most recent message
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }
    
    function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', `${sender}-message`);
      
      const now = new Date();
      const timeString = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
      
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${text}</p>
        </div>
        <div class="message-time">${timeString}</div>
      `;
      
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Speech synthesis for bot responses
    function speakText(text) {
      if ('speechSynthesis' in window) {
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        // Create a new speech object
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        
        // Try to find a Hindi voice if available, otherwise use default
        window.speechSynthesis.onvoiceschanged = () => {
          const voices = window.speechSynthesis.getVoices();
          const hindiVoice = voices.find(voice => voice.lang.includes('hi-IN'));
          const indianEnglishVoice = voices.find(voice => voice.lang.includes('en-IN'));
          
          // Prefer Hindi, fall back to Indian English, then default
          speech.voice = hindiVoice || indianEnglishVoice || voices[0];
        };
        
        // Speak the response
        window.speechSynthesis.speak(speech);
      }
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}); 