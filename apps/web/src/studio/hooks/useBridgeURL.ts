import { useStudioState } from '../StudioStateProvider';

export function useBridgeURL() {
  const studioState = useStudioState();

  let bridgeURL;

  if (studioState.local) {
    /*
     * Local studio mode.
     * Prefer local host for bridge discovery as it's faster
     *
     * TODO: Do we need to store it for full page reloads on local studio?
     */
    bridgeURL = studioState.localBridgeURL || studioState.tunnelBridgeURL;
  } else {
    // Cloud mode
    bridgeURL = studioState.storedBridgeURL;
  }

  return bridgeURL;
}
