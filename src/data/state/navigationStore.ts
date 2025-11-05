import { create } from 'zustand';
import { navigationsPath } from '../constants';

interface NavigationStore {
  location: string;
  snippetHome: () => void;
  preferences: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  location: navigationsPath.APP,

  snippetHome: () => set({ location: navigationsPath.APP }),
  preferences: () => set({ location: navigationsPath.PREFERENCES }),
}));
