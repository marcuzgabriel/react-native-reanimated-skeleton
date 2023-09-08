import { useCallback } from 'react';
import type { ICustomViewStyle, IComponentSize } from '../constants';

export const useGetBoneDimensions = (componentSize: IComponentSize) =>
  useCallback(
    (boneLayout: ICustomViewStyle) => {
      'worklet';

      return {
        width:
          typeof boneLayout.width === 'string'
            ? componentSize.width
            : boneLayout.width ?? 0,
        height:
          typeof boneLayout.height === 'string'
            ? componentSize.height
            : boneLayout.height ?? 0,
      } as { width: number; height: number };
    },
    [componentSize],
  );
