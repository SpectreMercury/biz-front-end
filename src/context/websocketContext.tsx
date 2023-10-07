"use client"

import React, { createContext, useContext, useEffect } from 'react';
import WebSocketClient from '@/api/websocketClient'; // 如果路径不同，请相应调整

interface WebSocketContextType {
  send: (eventType: string, eventData: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  useEffect(() => {
    return () => {
      WebSocketClient.close(); // 当组件卸载时关闭WebSocket连接
    };
  }, []);

  const send = (eventType: string, eventData: any) => {
    WebSocketClient.send([eventType, eventData]);
  };

  return (
    <WebSocketContext.Provider value={{ send }}>
      {children}
    </WebSocketContext.Provider>
  );
};
