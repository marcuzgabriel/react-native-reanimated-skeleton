import React, { useCallback } from 'react';
import ShiverBone from '../ShiverBone';
import StaticBone from '../StaticBone';
import type {
  ICustomViewStyle,
  IGeneralStyles,
  IComponentSize,
} from '../constants';

interface UseRenderBoneProps {
  generalStyles: IGeneralStyles;
  bonesLayout: ICustomViewStyle[];
  keyIndex: string | number;
  index: number;
}

/**
 * Renders the bone based on the animation type.
 * @componentSize is the size of the component.
 */
export const useRenderBone = (componentSize: IComponentSize) =>
  useCallback(
    ({ generalStyles, bonesLayout, keyIndex, index }: UseRenderBoneProps) => {
      if (
        generalStyles.animationType === 'pulse' ||
        generalStyles.animationType === 'none'
      ) {
        return (
          <StaticBone
            key={keyIndex}
            componentSize={componentSize}
            index={index}
            boneLayout={bonesLayout[index] ?? {}}
            {...generalStyles}
          />
        );
      }

      return (
        <ShiverBone
          key={keyIndex}
          componentSize={componentSize}
          boneLayout={bonesLayout[index] ?? {}}
          {...generalStyles}
        />
      );
    },
    [componentSize],
  );
