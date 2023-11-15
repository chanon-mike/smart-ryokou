'use client';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarContextType {
  openSnackbar: (message: string, severity?: 'info' | 'warning') => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'info' | 'warning' | undefined>(
    undefined,
  );

  const openSnackbar = (message: string, severity?: 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (snackbarOpen) {
      timeoutId = setTimeout(() => {
        closeSnackbar();
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [snackbarOpen]);

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar open={snackbarOpen} onClose={closeSnackbar} autoHideDuration={5000}>
        <Alert
          onClose={closeSnackbar}
          severity={snackbarSeverity}
          sx={{ backgroundColor: snackbarSeverity === 'info' ? '#4CAF50' : '#FF8C00' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
