import React, { memo } from 'react';
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import type { ICustomViewStyle, ISkeletonContentProps, IComponentSize } from './constants';
import { useGetBoneStyles } from './hooks';

type StaticBoneProps = Pick<
  ISkeletonContentProps,
  'boneColor' | 'highlightColor' | 'animationType' | 'animationDirection'
> & {
  componentSize: IComponentSize;
  boneLayout: ICustomViewStyle;
  animationValue: Animated.SharedValue<number>;
  index?: number | string;
};

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
    <Animated.View key={index} style={[boneStyle, animationType === 'none' ? {} : animatedStyle]} />
  );
};

export default memo(StaticBone);
