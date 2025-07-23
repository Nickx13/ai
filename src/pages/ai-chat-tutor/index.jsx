import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import Icon from '../../components/AppIcon';
import MessageBubble from './components/MessageBubble';
import QuickSuggestions from './components/QuickSuggestions';
import VoiceInput from './components/VoiceInput';
import ImageUpload from './components/ImageUpload';
import ConversationSidebar from './components/ConversationSidebar';

const AIChatTutor = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const pageLabels = {
    en: {
      title: "AI Tutor",
      placeholder: "Ask me anything...",
      welcomeMessage: "Hello! I\'m your AI tutor. I\'m here to help you learn and understand any topic. Feel free to ask me questions about your studies!",
      typingIndicator: "AI is typing...",
    },
    hi: {
      title: "AI शिक्षक",
      placeholder: "मुझसे कुछ भी पूछें...",
      welcomeMessage: "नमस्ते! मैं आपका AI शिक्षक हूं। मैं यहां आपको सीखने और किसी भी विषय को समझने में मदद करने के लिए हूं। अपनी पढ़ाई के बारे में मुझसे प्रश्न पूछने में संकोच न करें!",
      typingIndicator: "AI टाइप कर रहा है...",
    },
    bn: {
      title: "AI শিক্ষক",
      placeholder: "আমাকে যেকোনো কিছু জিজ্ঞাসা করুন...",
      welcomeMessage: "হ্যালো! আমি আপনার AI শিক্ষক। আমি এখানে আপনাকে শিখতে এবং যেকোনো বিষয় বুঝতে সাহায্য করতে এসেছি। আপনার পড়াশোনা সম্পর্কে আমাকে প্রশ্ন করতে দ্বিধা করবেন না!",
      typingIndicator: "AI টাইপ করছে...",
    },
    te: {
      title: "AI గురువు",
      placeholder: "నన్ను ఏదైనా అడగండి...",
      welcomeMessage: "హలో! నేను మీ AI గురువును. నేను మీకు నేర్చుకోవడంలో మరియు ఏదైనా విषయాన్ని అర్థం చేసుకోవడంలో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీ చదువుల గురించి నన్ను ప్రశ్నలు అడగడానికి సంకోచించకండి!",
      typingIndicator: "AI టైప్ చేస్తోంది...",
    },
    ta: {
      title: "AI ஆசிரியர்",
      placeholder: "என்னிடம் எதையும் கேளுங்கள்...",
      welcomeMessage: "வணக்கம்! நான் உங்கள் AI ஆசிரியர். நான் உங்களுக்கு கற்றுக்கொள்ளவும் எந்த தலைப்பையும் புரிந்துகொள்ளவும் உதவ இங்கே இருக்கிறேன். உங்கள் படிப்பைப் பற்றி என்னிடம் கேள்விகள் கேட்க தயங்காதீர்கள்!",
      typingIndicator: "AI டைப் செய்கிறது...",
    },
  };

  const labels = pageLabels[currentLanguage] || pageLabels.en;

  // Initialize with welcome message
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          content: labels.welcomeMessage,
          isUser: false,
          timestamp: new Date(),
          read: true,
        },
      ]);
    }
  }, []);

  // Update language when changed
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (savedLanguage !== currentLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, [currentLanguage]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      en: {
        quadratic: `Great question! The quadratic formula is: x = (-b ± √(b² - 4ac)) / 2a\n\nFor the equation ax² + bx + c = 0, this formula helps you find the values of x (the roots).\n\nWould you like me to solve a specific quadratic equation for you?`,
        photosynthesis: `Photosynthesis is the process by which plants make their own food using sunlight, water, and carbon dioxide.\n\nThe equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nThis happens in the chloroplasts of plant cells. Would you like to know more about the light and dark reactions?`,
        default: `I understand your question! Let me help you with that.\n\nCould you provide more specific details about what you'd like to learn? I can explain concepts, solve problems, or provide examples based on your needs.`,
      },
      hi: {
        quadratic: `बहुत अच्छा प्रश्न! द्विघात सूत्र है: x = (-b ± √(b² - 4ac)) / 2a\n\nसमीकरण ax² + bx + c = 0 के लिए, यह सूत्र आपको x के मान (मूल) खोजने में मदद करता है।\n\nक्या आप चाहते हैं कि मैं आपके लिए कोई विशिष्ट द्विघात समीकरण हल करूं?`,
        photosynthesis: `प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा पौधे सूर्य की रोशनी, पानी और कार्बन डाइऑक्साइड का उपयोग करके अपना भोजन बनाते हैं।\n\nसमीकरण है: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂\n\nयह पौधों की कोशिकाओं के क्लोरोप्लास्ट में होता है। क्या आप प्रकाश और अंधेरे अभिक्रियाओं के बारे में और जानना चाहते हैं?`,
        default: `मैं आपका प्रश्न समझ गया हूं! मुझे आपकी मदद करने दीजिए।\n\nक्या आप इस बारे में अधिक विशिष्ट विवरण दे सकते हैं कि आप क्या सीखना चाहते हैं? मैं आपकी आवश्यकताओं के आधार पर अवधारणाएं समझा सकता हूं, समस्याएं हल कर सकता हूं, या उदाहरण दे सकता हूं।`,
      },
    };

    const currentResponses = responses[currentLanguage] || responses.en;
    
    if (userMessage.toLowerCase().includes('quadratic') || userMessage.includes('x²')) {
      return currentResponses.quadratic;
    } else if (userMessage.toLowerCase().includes('photosynthesis')) {
      return currentResponses.photosynthesis;
    } else {
      return currentResponses.default;
    }
  };

  const handleSendMessage = (messageContent, imageData = null) => {
    if (!messageContent.trim() && !imageData) return;

    const newMessage = {
      id: Date.now(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
      read: false,
      ...(imageData && {
        image: imageData.image,
        extractedText: imageData.extractedText,
      }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: generateAIResponse(messageContent),
        isUser: false,
        timestamp: new Date(),
        read: true,
        ...(Math.random() > 0.7 && {
          steps: [
            "Identify the coefficients a, b, and c from the equation",
            "Substitute the values into the quadratic formula",
            "Calculate the discriminant (b² - 4ac)",
            "Find the two possible solutions using ± in the formula",
          ],
        }),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleVoiceTranscript = (transcript) => {
    setInputText(transcript);
    handleSendMessage(transcript);
  };

  const handleImageUpload = (imageData) => {
    handleSendMessage(imageData.extractedText, imageData);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-screen pt-14 pb-16">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-card-foreground">
                  {labels.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Always here to help you learn
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSidebar(true)}
                className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-150 lg:hidden"
              >
                <Icon name="Menu" size={20} className="text-muted-foreground" />
              </button>
              <button className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors duration-150">
                <Icon name="Settings" size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}
            
            {isTyping && (
              <MessageBubble
                message={{ content: '', timestamp: new Date() }}
                isUser={false}
                isTyping={true}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {showSuggestions && messages.length <= 1 && (
            <QuickSuggestions
              onSuggestionClick={handleSuggestionClick}
              currentLanguage={currentLanguage}
            />
          )}

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={labels.placeholder}
                  className="w-full max-h-32 min-h-[44px] px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                  rows={1}
                />
                
                {/* Character count for long messages */}
                {inputText.length > 100 && (
                  <div className="absolute bottom-1 right-12 text-xs text-muted-foreground">
                    {inputText.length}/500
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowVoiceInput(true)}
                  className="w-11 h-11 bg-secondary hover:bg-secondary/90 rounded-full flex items-center justify-center transition-colors duration-150"
                >
                  <Icon name="Mic" size={20} className="text-secondary-foreground" />
                </button>
                
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="w-11 h-11 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center transition-colors duration-150"
                >
                  <Icon name="Camera" size={20} className="text-accent-foreground" />
                </button>
                
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="w-11 h-11 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground rounded-full flex items-center justify-center transition-colors duration-150"
                >
                  <Icon name="Send" size={20} className="text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar for larger screens */}
        <div className="hidden lg:block">
          <ConversationSidebar
            isOpen={true}
            onClose={() => {}}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <ConversationSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        currentLanguage={currentLanguage}
      />

      {/* Voice Input Modal */}
      <VoiceInput
        isActive={showVoiceInput}
        onTranscript={handleVoiceTranscript}
        onToggle={() => setShowVoiceInput(false)}
        currentLanguage={currentLanguage}
      />

      {/* Image Upload Modal */}
      <ImageUpload
        isOpen={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onImageUpload={handleImageUpload}
        currentLanguage={currentLanguage}
      />

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default AIChatTutor;