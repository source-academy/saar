import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import React from 'react';

type ContextType = {
  overlayRef: React.RefObject<HTMLDivElement> | null;
  domOverlay: XRDOMOverlayInit | undefined;
  setState: (arState: JSX.Element, overlayState: JSX.Element) => void;
  component: JSX.Element;
};

const Context = createContext<ContextType>({
  overlayRef: null,
  domOverlay: undefined,
  setState() {},
  component: <></>,
});

type Props = {
  children: JSX.Element;
};

/**
 * Parent component with screen state context.
 * Used for managing ar content and its corresponding overlay.
 *
 * Steps to use:
 * 1. Add 'domOverlay' to sessionInit of AR toggle.
 * 2. Add 'component' as a child of this ScreenStateContext.
 * 3. Call 'setStates' to set all possible screen states.
 * 4. The first screen state in the map is used by default.
 * 5. To switch screen states, call 'setSelectedState' with the new state's key.
 * 6. Use 'overlayRef' to interact with the existing overlay.
 *
 * Components within it can call 'useScreenState' to obtain this context.
 */
export function ScreenStateContext(props: Props): JSX.Element {
  const [arState, setArState] = useState<JSX.Element>(<group></group>);
  const [overlayState, setOverlayState] = useState<JSX.Element>(<></>);
  const isXRSession = useRef<boolean>(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [domOverlay, setDomOverlay] = useState<HTMLDivElement | undefined>();
  const defaultComponent = (
    <>
      <Canvas>
        <XR>
          <></>
        </XR>
      </Canvas>
      <div ref={overlayRef} style={{ userSelect: 'none' }} />
    </>
  );
  const [component, setComponent] = useState<JSX.Element>(defaultComponent);

  useEffect(() => {
    if (!overlayRef) return;
    const overlay = overlayRef.current;
    if (overlay) {
      setDomOverlay(overlay);
    } else {
      setDomOverlay(undefined);
    }
  }, [overlayRef, component]);

  useEffect(() => {
    updateComponent();
  }, [arState, overlayState]);

  function updateComponent() {
    setComponent(
      <>
        <Canvas>
          <XR
            onSessionStart={() => {
              isXRSession.current = true;
              updateComponent();
            }}
            onSessionEnd={() => {
              isXRSession.current = false;
              updateComponent();
            }}
          >
            {isXRSession.current ? arState : <></>}
          </XR>
        </Canvas>
        <div
          ref={overlayRef}
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {isXRSession.current ? overlayState : <></>}
        </div>
      </>
    );
  }

  function setStates(
    newArState: JSX.Element | undefined,
    newOverlayState: JSX.Element | undefined
  ) {
    if (newArState) {
      setArState(newArState);
    } else {
      setArState(<group></group>);
    }
    if (newOverlayState) {
      setOverlayState(newOverlayState);
    } else {
      setOverlayState(<></>);
    }
  }

  return (
    <Context.Provider
      value={{
        overlayRef,
        domOverlay: domOverlay ? { root: domOverlay } : undefined,
        setState: setStates,
        component,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useScreenState() {
  return useContext(Context);
}
