import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
import type { ISkeletonContentProps, ICustomViewStyle, IComponentSize } from '../constants';

type UseGetGradientEndDirectionProps = Pick<
  ISkeletonContentProps,
  'animationType' | 'animationDirection'
> & {
  boneLayout: ICustomViewStyle;
};

export const useGetGradientEndDirection = (componentSize: IComponentSize) => {
  const getBoneDimensions = useGetBoneDimensions(componentSize);

  return useCallback(
    ({ animationType, animationDirection, boneLayout }: UseGetGradientEndDirectionProps) => {
      let direction = { x: 0, y: 0 };

      if (animationType === 'shiver') {
        if (animationDirection === 'horizontalLeft' || animationDirection === 'horizontalRight') {
          direction = { x: 1, y: 0 };
        } else if (animationDirection === 'verticalTop' || animationDirection === 'verticalDown') {
          direction = { x: 0, y: 1 };
        } else if (
          animationDirection === 'diagonalTopRight' ||
          animationDirection === 'diagonalDownRight' ||
          animationDirection === 'diagonalDownLeft' ||
          animationDirection === 'diagonalTopLeft'
        ) {
          const { height, width } = getBoneDimensions(boneLayout);
          return width && height && width > height ? { x: 0, y: 1 } : { x: 1, y: 0 };
        }
      }

      return direction;
    },
    [getBoneDimensions],
  );
};
