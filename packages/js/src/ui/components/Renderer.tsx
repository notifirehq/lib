import { For, onCleanup, onMount } from 'solid-js';
import { MountableElement, Portal } from 'solid-js/web';
import { NovuUI } from '..';
import type { NovuOptions } from '../../types';
import {
  AppearanceProvider,
  CountProvider,
  FocusManagerProvider,
  InboxProvider,
  LocalizationProvider,
  NovuProvider,
} from '../context';
import type { Tab, Appearance, Localization } from '../types';
import { Bell, Root, Preferences } from './elements';
import { Inbox } from './Inbox';
import { NotificationList as Notifications } from './Notification';

export const novuComponents = {
  Inbox,
  Bell,
  Preferences,
  Notifications,
};

export type NovuComponent = { name: NovuComponentName; props?: any };

export type NovuMounterProps = NovuComponent & { element: MountableElement };

export type NovuComponentName = keyof typeof novuComponents;

export type NovuComponentControls = {
  mount: (params: NovuMounterProps) => void;
  unmount: (params: { element: MountableElement }) => void;
  updateProps: (params: { element: MountableElement; props: unknown }) => void;
};

type RendererProps = {
  novuUI: NovuUI;
  cssHref: string;
  appearance?: Appearance;
  nodes: Map<MountableElement, NovuComponent>;
  localization?: Localization;
  options: NovuOptions;
  tabs: Array<Tab>;
};

export const Renderer = (props: RendererProps) => {
  onMount(() => {
    const id = 'novu-default-css';
    const el = document.getElementById(id);
    if (el) {
      return;
    }

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = props.cssHref;
    document.head.insertBefore(link, document.head.firstChild);

    onCleanup(() => {
      const element = document.getElementById(id);
      element?.remove();
    });
  });

  return (
    <NovuProvider options={props.options}>
      <LocalizationProvider localization={props.localization}>
        <AppearanceProvider id={props.novuUI.id} appearance={props.appearance}>
          <FocusManagerProvider>
            <InboxProvider tabs={props.tabs}>
              <CountProvider>
                <For each={[...props.nodes]}>
                  {([node, component]) => {
                    const Component = novuComponents[component.name];

                    return (
                      <Portal mount={node}>
                        <Root>
                          <Component {...component.props} />
                        </Root>
                      </Portal>
                    );
                  }}
                </For>
              </CountProvider>
            </InboxProvider>
          </FocusManagerProvider>
        </AppearanceProvider>
      </LocalizationProvider>
    </NovuProvider>
  );
};
