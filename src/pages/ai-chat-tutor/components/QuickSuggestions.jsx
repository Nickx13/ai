import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickSuggestions = ({ onSuggestionClick, currentLanguage }) => {
  const suggestions = {
    en: [
      { id: 1, text: "Explain this concept", icon: "BookOpen" },
      { id: 2, text: "Solve this problem", icon: "Calculator" },
      { id: 3, text: "Give me examples", icon: "Lightbulb" },
      { id: 4, text: "Practice questions", icon: "PenTool" },
      { id: 5, text: "Summary notes", icon: "FileText" },
    ],
    hi: [
      { id: 1, text: "इस अवधारणा को समझाएं", icon: "BookOpen" },
      { id: 2, text: "इस समस्या को हल करें", icon: "Calculator" },
      { id: 3, text: "मुझे उदाहरण दें", icon: "Lightbulb" },
      { id: 4, text: "अभ्यास प्रश्न", icon: "PenTool" },
      { id: 5, text: "सारांश नोट्स", icon: "FileText" },
    ],
    bn: [
      { id: 1, text: "এই ধারণাটি ব্যাখ্যা করুন", icon: "BookOpen" },
      { id: 2, text: "এই সমস্যার সমাধান করুন", icon: "Calculator" },
      { id: 3, text: "আমাকে উদাহরণ দিন", icon: "Lightbulb" },
      { id: 4, text: "অনুশীলন প্রশ্ন", icon: "PenTool" },
      { id: 5, text: "সারসংক্ষেপ নোট", icon: "FileText" },
    ],
    te: [
      { id: 1, text: "ఈ భావనను వివరించండి", icon: "BookOpen" },
      { id: 2, text: "ఈ సమస్యను పరిష్కరించండి", icon: "Calculator" },
      { id: 3, text: "నాకు ఉదాహరణలు ఇవ్వండి", icon: "Lightbulb" },
      { id: 4, text: "అభ్యాస ప్రశ్నలు", icon: "PenTool" },
      { id: 5, text: "సారాంశ గమనికలు", icon: "FileText" },
    ],
    ta: [
      { id: 1, text: "இந்த கருத்தை விளக்கவும்", icon: "BookOpen" },
      { id: 2, text: "இந்த பிரச்சனையை தீர்க்கவும்", icon: "Calculator" },
      { id: 3, text: "எனக்கு உதாரணங்கள் கொடுங்கள்", icon: "Lightbulb" },
      { id: 4, text: "பயிற்சி கேள்விகள்", icon: "PenTool" },
      { id: 5, text: "சுருக்க குறிப்புகள்", icon: "FileText" },
    ],
  };

  const currentSuggestions = suggestions[currentLanguage] || suggestions.en;

  return (
    <div className="px-4 py-2">
      <div className="flex flex-wrap gap-2">
        {currentSuggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm text-foreground transition-colors duration-150 border border-border"
          >
            <Icon name={suggestion.icon} size={14} className="text-muted-foreground" />
            <span>{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;