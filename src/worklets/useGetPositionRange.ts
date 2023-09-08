import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
import { ICustomViewStyle } from '../constants';
import type { ISkeletonProps, IComponentSize } from '../constants';

type UseGetPositionRangeProps = Pick<ISkeletonProps, 'animationDirection'> & {
  boneLayout: ICustomViewStyle;
};

export const useGetPositionRange = (componentSize: IComponentSize) => {
  const getBoneDimensions = useGetBoneDimensions(componentSize);

  return useCallback(
    ({ animationDirection, boneLayout }: UseGetPositionRangeProps) => {
      'worklet';

      const outputRange: number[] = [];
      const { width, height } = getBoneDimensions(boneLayout);

      switch (animationDirection) {
        case 'horizontalRight':
          outputRange.push(-width, +width);
          break;
        case 'horizontalLeft':
          outputRange.push(+width, -width);
          break;
        case 'verticalDown':
          outputRange.push(-height, +height);
          break;
        case 'verticalTop':
          outputRange.push(+height, -height);
          break;
      }

      return outputRange;
    },
    [getBoneDimensions],
  );
};
