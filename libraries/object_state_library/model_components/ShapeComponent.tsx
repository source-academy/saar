import { type MutableRefObject } from 'react';
import { type ShapeModel } from '../Behaviour';
import { type SpringValue, animated } from '@react-spring/three';
import { Outline } from '../Outline';
import React from 'react';

type ShapeProps = {
  shapeModel: ShapeModel;
  meshRef: MutableRefObject<any>;
  springPosition: SpringValue<[number, number, number]>;
  isSelected: boolean;
  isInFront: boolean;
  children?: JSX.Element | JSX.Element[];
};

/**
 * Component for showing a Three.js shape.
 */
export function ShapeComponent(props: ShapeProps) {
  return (
    <animated.mesh ref={props.meshRef} position={props.springPosition}>
      <mesh
        geometry={props.shapeModel.geometry}
        material={props.shapeModel.material}
      >
        <Outline isSelected={props.isSelected} isInFront={props.isInFront} />
      </mesh>
    </animated.mesh>
  );
}
