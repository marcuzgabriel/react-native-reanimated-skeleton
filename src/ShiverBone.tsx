import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useGetGradientTransform } from './worklets';
import { useGetBoneStyles, useGetGradientSize, useGetGradientEndDirection } from './hooks';
import type { ISkeletonContentProps, ICustomViewStyle, IComponentSize } from './constants';

type ShiverBoneProps = Pick<
  ISkeletonContentProps,
  'boneColor' | 'highlightColor' | 'animationType' | 'animationDirection'
> & {
  componentSize: IComponentSize;
  boneLayout: ICustomViewStyle;
  animationValue: Animated.SharedValue<number>;
  index?: number | string;
};

const ShiverBone: React.FC<ShiverBoneProps> = ({
  componentSize,
  boneLayout,
  boneColor,
  highlightColor,
  animationDirection,
  animationValue,
  animationType,
  index,
}) => {
  const transform = useGetGradientTransform({
    componentSize,
    boneLayout,
    animationDirection,
    animationValue,
  });

  const getBoneStyles = useGetBoneStyles(componentSize);
  const getGradientSize = useGetGradientSize(componentSize);
  const getGradientEndDirection = useGetGradientEndDirection(componentSize);

  const gradientSize = getGradientSize({ animationDirection, boneLayout });

  const animatedStyle = useAnimatedStyle(() => ({
    ...gradientSize,
    transform: [
      {
        translateX: transform.value.translateX ?? 0,
      },
      {
        translateY: transform.value.translateY ?? 0,
      },
      {
        rotate: transform.value.rotate ?? '0deg',
      },
    ],
  }));

  return (
    <View
      key={index}
      style={getBoneStyles({
        animationDirection,
        animationType,
        boneLayout,
        boneColor,
      })}
    >
      <Animated.View style={[styles.absoluteGradient, animatedStyle]}>
        <LinearGradient
          colors={[
            boneColor as string | number,
            highlightColor as string | number,
            boneColor as string | number,
          ]}
          start={{ x: 0, y: 0 }}
          end={getGradientEndDirection({
            animationType,
            animationDirection,
            boneLayout,
          })}
          style={styles.gradientChild}
        />
      </Animated.View>
    </View>
  );
};

export default memo(ShiverBone);

const styles = StyleSheet.create({
  absoluteGradient: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  gradientChild: {
    flex: 1,
  },
});
