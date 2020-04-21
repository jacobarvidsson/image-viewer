import React, { useRef } from "react";
import { Image, StyleSheet } from "react-native";
import * as GestureHandler from "react-native-gesture-handler";
import {
  useGestureHandler,
  useValues,
  withScaleOffset,
  usePanGestureHandler,
  withOffset,
  diffClamp,
} from "react-native-redash";
import Animated from "react-native-reanimated";

const { PinchGestureHandler, PanGestureHandler } = GestureHandler;

const uri =
  "https://images.unsplash.com/photo-1511732831640-a201294ac90e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";

const ImageViewer = () => {
  const pinchRef = useRef<GestureHandler.PinchGestureHandler>(null);
  const panRef = useRef<GestureHandler.PanGestureHandler>(null);
  const [scaleTransform, pinchState] = useValues(
    [1, GestureHandler.State.UNDETERMINED],
    []
  );
  const pinchGestureHandler = useGestureHandler(
    { scale: scaleTransform, state: pinchState },
    []
  );
  const { translation, state: panState, gestureHandler } = usePanGestureHandler(
    []
  );

  const translateX = diffClamp(withOffset(translation.x, panState), -200, 200);
  const translateY = diffClamp(withOffset(translation.y, panState), -200, 200);
  const scale = diffClamp(
    withScaleOffset(scaleTransform, pinchState),
    0.5,
    1.5
  );

  const transform: any = [{ translateX }, { translateY }, { scale }];

  return (
    <PinchGestureHandler
      ref={pinchRef}
      simultaneousHandlers={panRef}
      {...pinchGestureHandler}
    >
      <Animated.View style={{ flex: 1 }}>
        <PanGestureHandler
          ref={panRef}
          simultaneousHandlers={pinchRef}
          {...gestureHandler}
        >
          <Animated.View style={{ flex: 1, transform }}>
            <Image
              source={{ uri }}
              resizeMode="cover"
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default ImageViewer;
