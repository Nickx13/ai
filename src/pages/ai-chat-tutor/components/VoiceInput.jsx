import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Icon from '../../../components/AppIcon';

export default function VoiceInput({ isActive, onTranscript, onClose }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript
  } = useSpeechRecognition();

  const [isProcessing, setIsProcessing] = useState(false);

  // Handle speech recognition
  useEffect(() => {
    if (isActive && browserSupportsSpeechRecognition) {
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: true,
        language: "en-IN"
      });
    } else {
      SpeechRecognition.stopListening();
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isActive, browserSupportsSpeechRecognition]);

  // Auto-send when user stops speaking
  useEffect(() => {
    if (finalTranscript && !listening) {
      handleSend();
    }
  }, [finalTranscript, listening]);

  const handleSend = () => {
    if (transcript.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        onTranscript(transcript.trim());
        resetTranscript();
        onClose();
        setIsProcessing(false);
      }, 500); // Small delay for better UX
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: true,
        language: "en-IN"
      });
    }
  };

  if (!isActive) return null;

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80">
          <p className="text-red-500 mb-4">
            Your browser doesn't support voice input
          </p>
          <button 
            onClick={onClose}
            className="w-full py-2 bg-primary text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-[90vw]">
        {/* Microphone Button */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={toggleListening}
            disabled={isProcessing}
            className={`w-16 h-16 rounded-full flex items-center justify-center
              ${listening ? "bg-red-100 animate-pulse" : "bg-gray-100"}
              ${isProcessing ? "opacity-50" : ""}`}
          >
            {isProcessing ? (
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-gray-600" />
              </div>
            ) : (
              <Icon 
                name="Mic" 
                size={24} 
                className={listening ? "text-red-600" : "text-gray-600"} 
              />
            )}
          </button>
        </div>

        {/* Status Messages */}
        <div className="mb-4 text-center">
          <p className="font-medium">
            {isProcessing ? "Processing..." : 
             listening ? "Listening..." : "Ready to listen"}
          </p>
          <p className="text-sm text-gray-500">
            {isProcessing ? "Sending your message..." :
             listening ? "Speak now - click mic when done" : 
             "Press the mic button to begin"}
          </p>
        </div>

        {/* Transcript Display */}
        <div className="bg-gray-50 rounded-lg p-3 min-h-12 mb-4">
          {transcript ? (
            <p className="text-gray-800">{transcript}</p>
          ) : (
            <p className="text-gray-400 text-sm">
              {listening ? "Waiting for speech..." : "Your speech will appear here"}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              resetTranscript();
              onClose();
            }}
            className="flex-1 py-2 bg-gray-200 rounded-lg"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!transcript.trim() || isProcessing}
            className={`flex-1 py-2 rounded-lg ${
              (!transcript.trim() || isProcessing) 
                ? "bg-gray-300 text-gray-500" 
                : "bg-primary text-white"
            }`}
          >
            {isProcessing ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}