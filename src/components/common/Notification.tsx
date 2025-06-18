import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { hideNotification } from '../../store/slices/uiSlice';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.ui);
  const { message, type, visible } = notification;

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, dispatch]);

  if (!visible) {
    return null;
  }

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600 text-green-700 dark:text-green-400';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600 text-red-700 dark:text-red-400';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            className="w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className="w-5 h-5 text-red-500 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg
            className="w-5 h-5 text-blue-500 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div
        className={`rounded-lg border-l-4 shadow-md px-4 py-3 flex items-center ${getTypeClasses()} animate-fade-in-up`}
      >
        <div className="mr-3">{getIcon()}</div>
        <div className="text-sm font-medium">{message}</div>
        <button
          onClick={() => dispatch(hideNotification())}
          className="ml-auto text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;