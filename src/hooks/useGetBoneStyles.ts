import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
import {
  ICustomViewStyle,
  ISkeletonContentProps,
  IComponentSize,
  DEFAULT_BORDER_RADIUS,
} from '../constants';

type UseGetBoneStylesProps = Pick<
  ISkeletonContentProps,
  'animationType' | 'animationDirection' | 'boneColor'
> & {
  boneLayout: ICustomViewStyle;
};

export const useGetBoneStyles = (componentSize: IComponentSize) => {
  const getBoneDimensions = useGetBoneDimensions(componentSize);

  return useCallback(
    ({ animationDirection, animationType, boneLayout, boneColor }: UseGetBoneStylesProps) => {
      const { backgroundColor, borderRadius } = boneLayout;
      const { width, height } = getBoneDimensions(boneLayout);

      const boneStyle: ICustomViewStyle = {
        width,
        height,
        borderRadius: borderRadius || DEFAULT_BORDER_RADIUS,
        ...boneLayout,
      };

      if (animationType !== 'pulse') {
        boneStyle.overflow = 'hidden';
        boneStyle.backgroundColor = backgroundColor || boneColor;
      }

      if (
        animationDirection === 'diagonalDownRight' ||
        animationDirection === 'diagonalDownLeft' ||
        animationDirection === 'diagonalTopRight' ||
        animationDirection === 'diagonalTopLeft'
      ) {
        boneStyle.justifyContent = 'center';
        boneStyle.alignItems = 'center';
      }

      return boneStyle;
    },
    [getBoneDimensions],
  );
};
