import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
import type {
  ICustomViewStyle,
  ISkeletonProps,
  IComponentSize,
} from '../constants';

type UseGetGradientSizeProps = Pick<ISkeletonProps, 'animationDirection'> & {
  boneLayout: ICustomViewStyle;
};

export const useGetGradientSize = (componentSize: IComponentSize) => {
  const getBoneDimensions = useGetBoneDimensions(componentSize);

  return useCallback(
    ({ animationDirection, boneLayout }: UseGetGradientSizeProps) => {
      const { width, height } = getBoneDimensions(boneLayout);
      const gradientStyle: ICustomViewStyle = {};

      if (
        animationDirection === 'diagonalDownRight' ||
        animationDirection === 'diagonalDownLeft' ||
        animationDirection === 'diagonalTopRight' ||
        animationDirection === 'diagonalTopLeft'
      ) {
        gradientStyle.width = width as number;
        gradientStyle.height = height as number;

        if (height >= width) {
          gradientStyle.height *= 1.5;
        } else {
          gradientStyle.width *= 1.5;
        }
      }

      return gradientStyle;
    },
    [getBoneDimensions],
  );
};
