import { useFrame } from '@react-three/fiber';
import {
  type MutableRefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { type Object3D, type Object3DEventMap, AnimationMixer } from 'three';
import { type GltfModel } from '../Behaviour';
import { type ARObject } from '../ARObject';
import { type SpringValue, animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import React from 'react';

type GltfProps = {
  gltfModel: GltfModel;
  arObject: ARObject;
  meshRef: MutableRefObject<any>;
  springPosition: SpringValue<[number, number, number]>;
  children?: JSX.Element | JSX.Element[];
};

/**
 * Component for showing GLTF model.
 */
export function GltfComponent(props: GltfProps) {
  const model = useGLTF(props.gltfModel.resource);
  const [scene, setScene] = useState<Object3D<Object3DEventMap>>();
  const mixer = useRef<AnimationMixer>();

  useEffect(() => {
    // Need to clone to prevent bug when the same GLTF model is used in multiple objects.
    const clonedScene = SkeletonUtils.clone(model.scene);
    setScene(clonedScene);
    mixer.current = new AnimationMixer(clonedScene);
  }, [model.scene]);

  useEffect(() => {
    if (model.animations.length > 0) {
      // Creates a function that starts an animation in the GLTF model asset.
      props.gltfModel.callAnimation = (actionName: string) => {
        const selectedAction = model.animations.find(
          (item) => item.name === actionName
        );
        if (!selectedAction) return;
        mixer.current?.stopAllAction();
        const action = mixer.current?.clipAction(selectedAction);
        action?.play();
      };
    }
  }, [props.gltfModel, model.animations, model.animations.length]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  // Issue with excessively deep animated mesh https://github.com/pmndrs/react-spring/issues/1515
  return (
    <animated.mesh
      position={props.springPosition}
      scale={props.gltfModel.scale}
      ref={props.meshRef}
    >
      <Suspense fallback={null}>
        {scene ? <primitive object={scene} /> : null}
      </Suspense>
      {props.children}
    </animated.mesh>
  );
}
