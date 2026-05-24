"use client";

import React, { useEffect, useState } from 'react';

interface SimulatorShellProps {
  children: React.ReactNode;
}

export function SimulatorShell({ children }: SimulatorShellProps) {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    // Update time dynamically in the simulator status bar
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="simulator-wrapper">
      {/* Notch / Dynamic Island */}
      <div className="simulator-notch"></div>

      {/* Simulator Status Bar */}
      <div className="simulator-status-bar">
        <span>{time}</span>
        <div className="simulator-status-icons">
          {/* Signal Icon */}
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="8" width="2.5" height="3" rx="0.5" fill="currentColor" />
            <rect x="4.5" y="6" width="2.5" height="5" rx="0.5" fill="currentColor" />
            <rect x="8.5" y="4" width="2.5" height="7" rx="0.5" fill="currentColor" />
            <rect x="12.5" y="1" width="2.5" height="10" rx="0.5" fill="currentColor" />
          </svg>
          {/* Wifi Icon */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12C9.10457 12 10 11.1046 10 10C10 8.89543 9.10457 8 8 8C6.89543 8 6 8.89543 6 10C6 11.1046 6.89543 12 8 12Z" fill="currentColor" />
            <path d="M12.2426 5.75736C9.89949 3.41421 6.10051 3.41421 3.75736 5.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M15.0711 2.92893C11.1658 -0.976311 4.83418 -0.976311 0.928932 2.92893" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Battery Icon */}
          <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" />
            <rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor" />
            <path d="M20 3.5V7.5" stroke="currentColor" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Main interactive screen */}
      <div className="simulator-screen">
        {children}
      </div>

      {/* iOS Home Indicator */}
      <div className="simulator-home-indicator"></div>
    </div>
  );
}
