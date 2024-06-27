import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { IUserEntity } from '@novu/shared';
import { useAuth } from '../hooks/useAuth';
import { useEnvironment } from '../hooks/useEnvironment';
import type { StudioState } from './types';
import { decodeBase64 } from './utils/base64';

type BridgeURLGetterSetter = { bridgeURL: string; setBridgeURL: (url: string) => void };

const StudioStateContext = React.createContext<(StudioState & BridgeURLGetterSetter) | undefined>(undefined);

function computeBridgeURL(state: StudioState) {
  return state.local ? state.localBridgeURL || state.tunnelBridgeURL : state.storedBridgeURL;
}

function convertToTestUser(currentUser?: IUserEntity) {
  return {
    id: currentUser?._id || '',
    emailAddress: currentUser?.email || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
  };
}

export const StudioStateProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { environment } = useEnvironment();
  const [state, setState] = useState<StudioState>(() => {
    const stateParam = new URLSearchParams(location.search).get('state');

    // Local mode
    if (stateParam) {
      return decodeBase64(stateParam);
    }

    return {
      local: false,
      storedBridgeURL: environment?.echo?.url || '',
      testUser: convertToTestUser(currentUser),
    };
  });

  const [bridgeURL, setBridgeURL] = useState(computeBridgeURL(state));

  useEffect(() => {
    if (!state.local) {
      setState({
        local: false,
        storedBridgeURL: environment?.echo?.url || '',
        testUser: convertToTestUser(currentUser),
      });
    }
  }, [environment, state?.local, currentUser]);

  useEffect(() => {
    setBridgeURL(computeBridgeURL(state));
  }, [state]);

  const value = { ...state, bridgeURL, setBridgeURL };

  return <StudioStateContext.Provider value={value}>{children}</StudioStateContext.Provider>;
};

export const useStudioState = () => {
  const value = React.useContext(StudioStateContext);
  if (!value) {
    throw new Error("The useStudioState can't be used outside the <StudioStateProvider/>.");
  }

  return value;
};
