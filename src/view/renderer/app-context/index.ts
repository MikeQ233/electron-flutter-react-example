import { useShallow } from 'zustand/react/shallow';
import { useAppStore } from './app-store';

class _AppContext {
  useAppStore() {
    return useAppStore;
  }

  openNavigation() {
    useAppStore.setState({ navigationOpen: true });
  }

  closeNavigation() {
    useAppStore.setState({ navigationOpen: false });
  }
}

const AppContext = new _AppContext();

export { AppContext };
