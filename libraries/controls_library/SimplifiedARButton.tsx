import { ARButton } from '@react-three/xr';
import React from 'react';

type Props = {
  domOverlay: XRDOMOverlayInit | undefined;
  enterOnly?: boolean;
  exitOnly?: boolean;
};

/**
 * An AR button with features specified, to allow hit testing.
 */
export function SimplifiedARButton(props: Props) {
  return (
    <ARButton
      sessionInit={{
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: props.domOverlay,
      }}
      enterOnly={props.enterOnly}
      exitOnly={props.exitOnly}
    />
  );
}
