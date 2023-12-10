import React, { Children, useCallback } from 'react';
import { View } from 'react-native';
import { useRenderBone } from '../hooks';
import StaticBone from '../StaticBone';
import ShiverBone from '../ShiverBone';
import type {
  ICustomViewStyle,
  IGeneralStyles,
  IComponentSize,
} from '../constants';

interface UseGetBonesProps {
  bonesLayout: ICustomViewStyle[];
  children: React.ReactNode;
  prefix?: string | number;
  generalStyles: IGeneralStyles;
}

/**
 * This hook is used to get the bones based on the layout prop.
 * @componentSize is the size of the component.
 */
export const useGetBones = (componentSize: IComponentSize) => {
  const renderBone = useRenderBone(componentSize);

  const renderNestedBones = useCallback(
    (
      bones: ICustomViewStyle[],
      prefix: string | number | undefined,
      generalStyles: IGeneralStyles,
    ) => {
      return bones.map((bone, index) => {
        const keyIndex = prefix ? `${prefix}_${index}` : index;

        const { children: childBones, ...layoutStyle } = bone;

        if (childBones?.length) {
          return (
            <View key={keyIndex} style={layoutStyle}>
              {renderNestedBones(childBones, keyIndex, generalStyles)}
            </View>
          );
        }

        return renderBone({
          generalStyles,
          bonesLayout: bones,
          index,
          keyIndex,
        });
      });
    },
    [renderBone],
  );

  return useCallback(
    ({ bonesLayout, children, prefix, generalStyles }: UseGetBonesProps) => {
      if (bonesLayout && bonesLayout.length > 0) {
        return renderNestedBones(bonesLayout, prefix, generalStyles);
      }

      return Children.map(children as JSX.Element[], (child, i) => {
        const styling = child.props.style || {};

        if (
          generalStyles.animationType === 'pulse' ||
          generalStyles.animationType === 'none'
        ) {
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
    [componentSize, renderNestedBones],
  );
};
