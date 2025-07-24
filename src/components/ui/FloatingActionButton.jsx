import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  // Determine the action based on current page
  const getActionConfig = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/ai-chat-tutor':
        return {
          icon: 'Mic',
          action: 'voice',
          tooltip: 'Voice input',
          color: 'bg-secondary',
        };
      case '/doubt-solver':
        return {
          icon: 'MessageCircle',
          action: 'chat',
          tooltip: 'Ask AI tutor',
          color: 'bg-primary',
        };
      case '/adaptive-quiz':
        return {
          icon: 'Camera',
          action: 'camera',
          tooltip: 'Scan question',
          color: 'bg-accent',
        };
      case '/study-plan-generator':
        return {
          icon: 'Plus',
          action: 'add',
          tooltip: 'Add study goal',
          color: 'bg-success',
        };
      case '/home-dashboard':
        return {
          icon: 'Camera',
          action: 'camera',
          tooltip: 'Quick solve',
          color: 'bg-primary',
        };
      default:
        return {
          icon: 'Camera',
          action: 'camera',
          tooltip: 'Quick solve',
          color: 'bg-primary',
        };
    }
  };

  const config = getActionConfig();

  const handleAction = () => {
    setIsPressed(true);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 150);

    switch (config.action) {
      case 'voice':
        // Handle voice input
        console.log('Starting voice input...');
        break;
      case 'chat': navigate('/ai-chat-tutor');
        break;
      case 'camera':
        if (location.pathname !== '/doubt-solver') {
          navigate('/doubt-solver');
        } else {
          // Trigger camera action
          console.log('Opening camera...');
        }
        break;
      case 'add':
        // Handle add study goal
        console.log('Adding new study goal...');
        break;
      default:
        navigate('/doubt-solver');
    }
  };

  // Hide FAB on parent dashboard
  if (location.pathname === '/parent-dashboard') {
    return null;
  }

};

export default FloatingActionButton;
