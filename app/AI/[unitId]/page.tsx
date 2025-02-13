'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Send, Book, AlertCircle, Loader2, Sparkles, BookOpen, GraduationCap, User, Bot } from 'lucide-react';
// import { Send, Book, AlertCircle, Loader2 } from 'lucide-react';

const page = () => {
  return (
    <div className='pt-24'>
    <UnitChatbot unitCode="COMP1000" unitName="Introduction to Computer Science" />
    </div>
  )
}

export default page;


type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
};

type UnitChatbotProps = {
  unitCode: string;
  unitName: string;
};

const UnitChatbot = ({ unitCode, unitName }: UnitChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const shouldAutoScroll = messagesContainerRef.current.scrollTop >= maxScroll - 100;

      if (shouldAutoScroll) {
        messagesContainerRef.current.scrollTop = scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a sample response about ${unitCode}. In a real implementation, this would be connected to your backend API.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const MessageAvatar = ({ sender }: { sender: 'user' | 'bot' }) => (
    <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
      sender === 'user' 
        ? 'bg-blue-600 bg-gradient-to-br from-blue-500 to-blue-600' 
        : 'bg-purple-600 bg-gradient-to-br from-purple-500 to-purple-600'
    }`}>
      {sender === 'user' 
        ? <User className="w-6 h-6 text-white" /> 
        : <Bot className="w-6 h-6 text-white" />
      }
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-black/30 backdrop-blur-md border-r border-white/10 p-4">
        <div className="flex items-center space-x-2 mb-8">
          <GraduationCap className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold text-white">UnitTutor</h1>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition cursor-pointer">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Study Materials</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition cursor-pointer">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Practice Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4">
          <div className="flex items-center space-x-3">
            <Book className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-bold text-white">{unitCode}</h2>
              <p className="text-blue-300">{unitName}</p>
            </div>
          </div>
        </div>

        {/* Messages Container with Scroll */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 bg-black/20 backdrop-blur-sm p-6 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="bg-blue-500/10 rounded-full p-4">
                  <AlertCircle className="w-12 h-12 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-white text-lg font-medium">Start Your Learning Journey</p>
                  <p className="text-gray-400">Ask any question about {unitCode}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
                  >
                    <MessageAvatar sender={message.sender} />
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                          : 'bg-white/10 backdrop-blur-md text-white'
                      }`}
                    >
                      <p className="text-lg">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <MessageAvatar sender="bot" />
                    <div className="flex items-center space-x-2">
                      <div className="bg-white/10 backdrop-blur-md rounded-full p-3">
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                      </div>
                      <span className="text-blue-300">AI Tutor is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-black/30 backdrop-blur-md border-t border-white/10 p-4">
          <div className="max-w-4xl mx-auto flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask anything about ${unitCode}...`}
              className="flex-1 bg-white/5 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl px-6 py-4 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
