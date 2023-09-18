// Project: https://github.com/marcuzgabriel/react-native-reanimated-skeleton

declare module 'react-native-reanimated-skeleton' {
  import React from 'react';
  import { StyleProp, ViewStyle } from 'react-native';
  import { SharedValue, EasingFunction } from 'react-native-reanimated';

  type _animationType = 'none' | 'shiver' | 'pulse' | undefined;
  type _animationDirection =
    | 'horizontalLeft'
    | 'horizontalRight'
    | 'verticalTop'
    | 'verticalDown'
    | 'diagonalDownLeft'
    | 'diagonalDownRight'
    | 'diagonalTopLeft'
    | 'diagonalTopRight'
    | undefined;

  export interface ICustomViewStyle extends ViewStyle {
    children?: ICustomViewStyle[];
    key?: number | string;
  }

  export interface ISkeletonProps {
    isLoading: boolean;
    layout?: ICustomViewStyle[];
    duration?: number;
    containerStyle?: StyleProp<ViewStyle>;
    animationType?: _animationType;
    animationDirection?: _animationDirection;
    boneColor?: string | undefined;
    highlightColor?: string | undefined;
    easing?: { factory: () => EasingFunction };
    children?: React.ReactNode;
  }

  export interface IComponentSize {
    width: number;
    height: number;
  }

  export interface IGeneralStyles {
    animationDirection: _animationDirection;
    animationType: _animationType;
    boneColor: string;
    highlightColor: string;
    animationValue: SharedValue<number>;
  }

  export interface IDirection {
    x: number;
    y: number;
  }

  function Skeleton<P extends ISkeletonProps>(props: P): React.ReactElement<P>;

  export default Skeleton;
}
