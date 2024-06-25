import { createContext, JSX, useContext } from 'solid-js';
import { Novu, NovuOptions } from '../../novu';

type NovuProviderProps = {
  options: NovuOptions;
  children: JSX.Element;
};

const NovuContext = createContext<Novu | undefined>(undefined);

export function NovuProvider(props: NovuProviderProps) {
  const novu = new Novu({ ...props.options, backendUrl: 'http://localhost:3000', socketUrl: 'ws://localhost:3002' });

  return <NovuContext.Provider value={novu}>{props.children}</NovuContext.Provider>;
}

export function useNovu() {
  const context = useContext(NovuContext);
  if (!context) {
    throw new Error('useNovu must be used within a NovuProvider');
  }

  return context;
}
