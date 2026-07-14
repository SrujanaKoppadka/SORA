import { createContext, useContext, useState, useCallback } from 'react';

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const openFeedback = useCallback(() => setIsFeedbackOpen(true), []);
  const closeFeedback = useCallback(() => setIsFeedbackOpen(false), []);

  return (
    <FeedbackContext.Provider value={{ isFeedbackOpen, openFeedback, closeFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}