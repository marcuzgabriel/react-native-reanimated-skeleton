import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
import { DEFAULT_CONFIG, } from '../constants';
export const useGetBoneStyles = (componentSize) => {
    const getBoneDimensions = useGetBoneDimensions(componentSize);
    return useCallback(({ animationDirection, animationType, boneLayout, boneColor, }) => {
        const { backgroundColor, borderRadius } = boneLayout;
        const { width, height } = getBoneDimensions(boneLayout);
        const boneStyle = Object.assign({ width,
            height, borderRadius: borderRadius || DEFAULT_CONFIG.BORDER_RADIUS }, boneLayout);
        if (animationType !== 'pulse') {
            boneStyle.overflow = 'hidden';
            boneStyle.backgroundColor = backgroundColor || boneColor;
        }
        if (animationDirection === 'diagonalDownRight' ||
            animationDirection === 'diagonalDownLeft' ||
            animationDirection === 'diagonalTopRight' ||
            animationDirection === 'diagonalTopLeft') {
            boneStyle.justifyContent = 'center';
            boneStyle.alignItems = 'center';
        }
        return boneStyle;
    }, [getBoneDimensions]);
};
