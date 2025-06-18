import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum UIView {
  CREATE_BRACKET = 'CREATE_BRACKET',
  EDIT_BRACKET = 'EDIT_BRACKET',
  VIEW_BRACKET = 'VIEW_BRACKET',
  BRACKET_LIST = 'BRACKET_LIST',
  TEAM_SELECTION = 'TEAM_SELECTION',
  BRACKET_SETTINGS = 'BRACKET_SETTINGS',
  HELP = 'HELP',
}

interface UIState {
  currentView: UIView;
  modalOpen: boolean;
  modalContent: string | null;
  selectedMatchupId: string | null;
  editMode: boolean;
  isMobile: boolean;
  darkMode: boolean;
  notification: {
    message: string | null;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  };
}

const initialState: UIState = {
  currentView: UIView.CREATE_BRACKET,
  modalOpen: false,
  modalContent: null,
  selectedMatchupId: null,
  editMode: false,
  isMobile: window.innerWidth < 768,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  notification: {
    message: null,
    type: 'info',
    visible: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<UIView>) => {
      state.currentView = action.payload;
    },
    
    openModal: (state, action: PayloadAction<string>) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    
    setSelectedMatchup: (state, action: PayloadAction<string | null>) => {
      state.selectedMatchupId = action.payload;
    },
    
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      
      // Apply dark mode class to document
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>
    ) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        visible: true,
      };
    },
    
    hideNotification: (state) => {
      state.notification.visible = false;
    },
  },
});

export const {
  setCurrentView,
  openModal,
  closeModal,
  setSelectedMatchup,
  setEditMode,
  setIsMobile,
  toggleDarkMode,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer;