import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
import { ICustomViewStyle } from '../constants';
import type { ISkeletonContentProps, IComponentSize } from '../constants';

type UseGetPositionRangeProps = Pick<ISkeletonContentProps, 'animationDirection'> & {
  boneLayout: ICustomViewStyle;
};

export const useGetPositionRange = (componentSize: IComponentSize) => {
  const getBoneDimensions = useGetBoneDimensions(componentSize);

  return useCallback(
    ({ animationDirection, boneLayout }: UseGetPositionRangeProps) => {
      'worklet';

      const outputRange: number[] = [];
      const { width, height } = getBoneDimensions(boneLayout);

      if (animationDirection === 'horizontalRight') {
        outputRange.push(-width, +width);
      } else if (animationDirection === 'horizontalLeft') {
        outputRange.push(+width, -width);
      } else if (animationDirection === 'verticalDown') {
        outputRange.push(-height, +height);
      } else if (animationDirection === 'verticalTop') {
        outputRange.push(+height, -height);
      }

      return outputRange;
    },
    [getBoneDimensions],
  );
};
