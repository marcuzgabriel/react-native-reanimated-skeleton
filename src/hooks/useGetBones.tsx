import React, { Children, useCallback } from 'react';
import { View } from 'react-native';
import { useRenderBone } from '../hooks';
import StaticBone from '../StaticBone';
import ShiverBone from '../ShiverBone';
import type { ICustomViewStyle, IGeneralStyles, IComponentSize } from '../constants';

interface UseGetBonesProps {
  bonesLayout: ICustomViewStyle[];
  children: React.ReactNode;
  prefix?: string | number;
  generalStyles: IGeneralStyles;
}

export const useGetBones = (componentSize: IComponentSize) => {
  const renderBone = useRenderBone(componentSize);

  return useCallback(
    ({ bonesLayout, children, prefix, generalStyles }: UseGetBonesProps) => {
      if (bonesLayout && bonesLayout.length > 0) {
        const iterator: number[] = new Array(bonesLayout.length).fill(0);

        return iterator.map((_, i) => {
          /* NOTE: Has nested layout with children */
          if (bonesLayout[i]?.children?.length) {
            const containerPrefix = bonesLayout[i]?.key || `bone_container_${i}`;
            const { children: childBones, ...layoutStyle } = bonesLayout[i] ?? {};

            return (
              <View key={containerPrefix} style={layoutStyle}>
                {childBones?.map((__, childIndex) =>
                  renderBone({
                    generalStyles,
                    bonesLayout: childBones,
                    index: childIndex,
                    keyIndex: prefix ? `${prefix}_${childIndex}` : childIndex,
                  }),
                )}
              </View>
            );
          }

          return renderBone({
            generalStyles,
            bonesLayout,
            index: i,
            keyIndex: prefix ? `${prefix}_${i}` : i,
          });
        });
      }

      return Children.map(children as JSX.Element[], (child, i) => {
        const styling = child.props.style || {};

        if (generalStyles.animationType === 'pulse' || generalStyles.animationType === 'none') {
          return (
            <StaticBone
              key={prefix ? `${prefix}_${i}` : i}
              index={i}
              boneLayout={styling}
              componentSize={componentSize}
              {...generalStyles}
            />
          );
        }

        return (
          <ShiverBone
            index={prefix ? `${prefix}_${i}` : i}
            componentSize={componentSize}
            boneLayout={styling}
            {...generalStyles}
          />
        );
      });
    },
    [componentSize, renderBone],
  );
};
