import { StyleProp, ViewStyle } from 'react-native';
import { Easing, SharedValue, EasingFn } from 'react-native-reanimated';

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
  hasFadeIn?: boolean;
  highlightColor?: string | undefined;
  easing?: { factory: () => EasingFn };
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

export const DEFAULT_CONFIG = {
  BORDER_RADIUS: 4,
  DURATION: 1200,
  ANIMATION_TYPE: 'shiver' as _animationType,
  ANIMATION_DIRECTION: 'horizontalLeft' as _animationDirection,
  BONE_COLOR: '#E1E9EE',
  HIGHLIGHT_COLOR: '#F2F8FC',
  EASING: Easing.bezier(0.5, 0, 0.25, 1),
  LOADING: true,
};
