import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_BONE_COLOR,
  DEFAULT_DURATION,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_LOADING,
  DEFAULT_EASING,
  ISkeletonContentProps,
} from './constants';
import { useLayout, useGetBones } from './hooks';

function SkeletonContent({
  containerStyle = styles.container,
  duration = DEFAULT_DURATION,
  easing = DEFAULT_EASING,
  layout = [],
  animationType = DEFAULT_ANIMATION_TYPE,
  animationDirection = DEFAULT_ANIMATION_DIRECTION,
  isLoading = DEFAULT_LOADING,
  boneColor = DEFAULT_BONE_COLOR,
  highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  children,
}: ISkeletonContentProps) {
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
    [animationDirection, animationType, animationValue, boneColor, highlightColor],
  );

  const getBones = useGetBones(componentSize);

  useAnimatedReaction(
    () => ({ loadingValue }),
    () => {
      if (loadingValue.value === 1) {
        animationValue.value =
          shiverValue.value === 1
            ? withRepeat(withTiming(1, { duration, easing }), -1, false)
            : withRepeat(withTiming(1, { duration: duration / 2, easing }), -1, true);
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
}

export default memo(SkeletonContent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
