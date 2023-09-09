import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
export const useGetGradientSize = (componentSize) => {
    const getBoneDimensions = useGetBoneDimensions(componentSize);
    return useCallback(({ animationDirection, boneLayout }) => {
        const { width, height } = getBoneDimensions(boneLayout);
        const gradientStyle = {};
        if (animationDirection === 'diagonalDownRight' ||
            animationDirection === 'diagonalDownLeft' ||
            animationDirection === 'diagonalTopRight' ||
            animationDirection === 'diagonalTopLeft') {
            gradientStyle.width = width;
            gradientStyle.height = height;
            if (height >= width) {
                gradientStyle.height *= 1.5;
            }
            else {
                gradientStyle.width *= 1.5;
            }
        }
        return gradientStyle;
    }, [getBoneDimensions]);
};
