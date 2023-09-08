import React, { memo } from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import { useGetBoneStyles } from './hooks';
import type {
  ICustomViewStyle,
  ISkeletonProps,
  IComponentSize,
} from './constants';

type StaticBoneProps = Pick<
  ISkeletonProps,
  'boneColor' | 'highlightColor' | 'animationType' | 'animationDirection'
> & {
  componentSize: IComponentSize;
  boneLayout: ICustomViewStyle;
  animationValue: SharedValue<number>;
  index?: number | string;
};

/**
 * StaticBone is a component that renders a rectangle with a static color.
 * @boneLayout is the layout of the bone.
 * @boneColor is the color of the bone.
 * @highlightColor is the color of the highlight.
 * @animationDirection is the direction of the animation.
 * @animationValue is the value of the animation.
 * @animationType is the type of the animation.
 * @index is the index of the bone.
 * @componentSize is the size of the component.
 */
const StaticBone: React.FC<StaticBoneProps> = ({
  boneLayout,
  index,
  componentSize,
  highlightColor,
  animationValue,
  animationDirection,
  animationType,
  boneColor,
}) => {
  const getBoneStyles = useGetBoneStyles(componentSize);

  const boneStyle = getBoneStyles({
    animationDirection,
    animationType,
    boneLayout,
    boneColor,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animationValue.value,
      [0, 1],
      [boneColor as string, highlightColor as string],
    ),
  }));

  return (
    <Animated.View
      key={index}
      style={[boneStyle, animationType === 'none' ? {} : animatedStyle]}
    />
  );
};

export default memo(StaticBone);
