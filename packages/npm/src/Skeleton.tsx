import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { DEFAULT_CONFIG } from './constants';
import { useLayout, useGetBones } from './hooks';
import type { ISkeletonProps } from './constants';

/* NOTE: Exporting props so it can be reused */
export { ISkeletonProps };

/**
 * Skeleton is a component that renders a skeleton of a component based on the layout.
 * @containerStyle is the style of the container.
 * @duration is the duration of the animation.
 * @easing is the easing of the animation.
 * @layout is the layout of the components.
 * @animationType is the type of the animation.
 * @animationDirection is the direction of the animation.
 * @isLoading is the state of the animation visibility.
 * @boneColor is the color of the bone.
 * @highlightColor is the color of the highlight.
 * @children is the children of the component / the content that should be visible after loading.
 */
const Skeleton: React.FC<ISkeletonProps> = ({
  containerStyle = styles.container,
  duration = DEFAULT_CONFIG.DURATION,
  easing = DEFAULT_CONFIG.EASING,
  layout = [],
  animationType = DEFAULT_CONFIG.ANIMATION_TYPE,
  animationDirection = DEFAULT_CONFIG.ANIMATION_DIRECTION,
  isLoading = DEFAULT_CONFIG.LOADING,
  boneColor = DEFAULT_CONFIG.BONE_COLOR,
  highlightColor = DEFAULT_CONFIG.HIGHLIGHT_COLOR,
  children,
}) => {
  const animationValue = useSharedValue(0);
  const loadingValue = useSharedValue(isLoading ? 1 : 0);
  const shiverValue = useSharedValue(animationType === 'shiver' ? 1 : 0);
  const [componentSize, onLayout] = useLayout();
  const generalStyles = useMemo(
    () => ({
      animationDirection,
      animationType,
      boneColor,
      animationValue,
      highlightColor,
    }),
    [
      animationDirection,
      animationType,
      animationValue,
      boneColor,
      highlightColor,
    ],
  );

  const getBones = useGetBones(componentSize);

  useAnimatedReaction(
    () => ({ loadingValue }),
    () => {
      if (loadingValue.value === 1) {
        animationValue.value =
          shiverValue.value === 1
            ? withRepeat(withTiming(1, { duration, easing }), -1, false)
            : withRepeat(
                withTiming(1, { duration: duration / 2, easing }),
                -1,
                true,
              );
      }
    },
    [loadingValue, shiverValue],
  );

  return (
    <View style={containerStyle} onLayout={onLayout}>
      {isLoading
        ? getBones({
            bonesLayout: layout,
            children,
            generalStyles,
          })
        : children}
    </View>
  );
};

export default memo(Skeleton);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
