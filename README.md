# Introduction

This package provides a simplified way to create AR content, from adding objects to the augmented world with predefined behaviours, to recalibrating the user's position. Based on Three.js.

⚠︎ Note: Importing as a package does not work at the moment. Please copy the libraries into your project and install the required dependencies.

# Screen State Library

This library allows you to manage overlays with ease. With just a single function call, you can replace the AR layer and overlay layer.

To get started, make sure to wrap all your content within `ScreenStateContext`.

```
<ScreenStateContext>
  <Content />
</ScreenStateContext>
```

Then, within the content component, use the DOM overlay provided by `useScreenState` in your ARButton and add the component for AR, as seen below.

```
const screenState = useScreenState();

return (
  <div>
    <ARButton
      sessionInit={{
        optionalFeatures: ['dom-overlay'],
        domOverlay: screenState.domOverlay,
      }}
    />
    { screenState.component }
  </div>
)
```

Finally, to set the current screen, use `setState`.

```
screenState.setState(<ARLayer/>, <OverlayLayer/>)
```

# Calibration Library

The calibration library allows you to recalibrate the position and orientation of the user within the augmented world, with a single function call.

First, wrap your AR layer in `PlayAreaContext`, as seen here.

```
<PlayAreaContext>
  <Content />
</PlayAreaContext>
```

Then, to set the user's current orientation and position as the new zero, simply call `setCameraAsOrigin` provided by the context. If you want to manually set a particular position and orientation as zero, use `setPositionAsOrigin` instead.

```
const playArea = usePlayArea()

function recalibrate() {
  playArea.setCameraAsOrigin()
}
```

After recalibration, the camera provided by Three.js would not provide the right position and orientation. Instead, you should call `getCameraPosition` and `getCameraRotation` provided by the context to obtain the calibrated position/rotation.

# Objects Library

The objects library makes it easier to add objects to your AR world, with predefined behaviours. Using this library, you will also be able to parse objects into JSON, and parse the JSON on another device restore them with their behaviour.

## Behaviours

Four types of behaviours are available: Model, render, rotation and movement. The latter 3 can be parsed into JSON. The model behaviour is linked to the type of object created. Some predefined objects are included and you can refer to them to define your own object.

### 1. Model Behaviour

Four types of models are available: glTF, shape, interface and light.

The `GltfModel` takes in any glTF asset; Simply specify the file to use it.

```

```

Meanwhile, `ShapeModel` accepts any geometry and material provided by Three.js.

```

```

The `InterfaceModel` allows you to customize your own floating UI using rows, columns, image and text. Since HTML components are not supported, we needed to create our own.

```

```

Lastly, `LightModel` allows you to place a light source at a spot, and it will shine in all directions from the spot. Note that not all Three.JS support shadows.

### 2. Render Behaviour

You can set a render distance (in meters) to the object using `RenderWithinDistance`, or allow it to always render with `AlwaysRender`.

### 3. Rotation Behaviour

Various types of rotation behaviors are available. `RotateToUser` would rotate the object to always face the user. `RotateAroundY` spins the object around the vertical axis continuously. Lastly, `FixRotation` allows you to specify a fix angle of rotation.

### 4. Movement Behaviour

This library allows for 3 types of movement behaviours. `PathMovement` allows you to specify an array of segments via `PathItem` and the object will cycle through each segment. Meanwhile, `OrbitMovement` orbits the object around its position in the vertical axis, at the specified radius and round duration. Lastly, `SpringMovement` makes use of the Spring library to animate movement when the object's position changes.

## Adding Objects

// Todo

## Parsing From JSON

// Todo

# Controls Library

The controls library provides tools that allows for new ways of interacting with objects within the world. This includes surface detection and facing-object detection.

Before you can use it, you will need to wrap your AR content in `ControlsContext`.

```
<ControlsContext>
  <Content />
</ControlsContext>
```

## Surface Detection

For surface detection, we will be using hit-test capabilities. To set it up, you can use the `SimplifieARButton` to replace the regular ARButton. Then, add `HitPointIndicator` as a component within your AR component to show the surface detected.

To read the position of the object detected, obtain `hitPointPosition` from the context.

```
const controls = useControls()

function getSurfacePosition() {
  return controls.hitPointPosition
}
```

## Front Object Detection

This tool allows you to obtain the object that is directly in the middle of your screen, if any.There is just one rule for this to work: The object must not be a child or a sub-child of another mesh, up to the root node provided.

There are two ways to use it, active detection or passive detection. For active detection, you can simply obtain the detected object mesh from the controls as follows:

```
const controls = useControls()

function getFrontObject() {
  return controls.objectInSight
}
```

To passively be alerted of changes to the front object, you can set a callback via `objectInSightCallback`, provided by the context. The callback will trigger whenever a new object is detected, or the previous object is out of the line of sight.

```
useEffect(() => {
  controls.setObjectInSightCallback((prev, current) => {
    // Use prev and current mesh here
  })
}, [])
```

To link a mesh back to its ARObject, simply compare the uuid of the mesh with the uuid of all ARObjects available, as seen here:

```
let object = objectsRef.current.find((item) => {
    return item.uuid === current.uuid;
});
```
